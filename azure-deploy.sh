#!/bin/bash

# Enhanced deployment script for CampusPe Azure Static Web App
# This script matches your GitHub Actions workflow configuration

# Colors for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== CampusPe Azure Static Web App Deployment ===${NC}"

# Step 1: Check and install required tools
echo -e "\n${GREEN}Checking for required tools...${NC}"

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js not found. Please install it from https://nodejs.org/${NC}"
    exit 1
else
    NODE_VERSION=$(node -v)
    echo -e "Node.js ${GREEN}✓${NC} (${NODE_VERSION})"
fi

# Check for npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm not found. Please install Node.js from https://nodejs.org/${NC}"
    exit 1
else
    NPM_VERSION=$(npm -v)
    echo -e "npm ${GREEN}✓${NC} (${NPM_VERSION})"
fi

# Install or update SWA CLI
echo -e "\n${GREEN}Installing/updating Azure Static Web Apps CLI...${NC}"
npm install -g @azure/static-web-apps-cli

# Step 2: Get deployment token
echo -e "\n${GREEN}Deployment Token Required${NC}"
echo -e "${BLUE}--------------------------------------------------${NC}"
echo -e "To get your deployment token:"
echo -e "1. Go to Azure Portal: ${BLUE}https://portal.azure.com${NC}"
echo -e "2. Find your Static Web App (red-rock-0014e2510)"
echo -e "3. Go to: Overview → Manage deployment token"
echo -e "4. Copy the token and paste it below"
echo -e "${BLUE}--------------------------------------------------${NC}"
read -p "Enter your Static Web Apps deployment token: " DEPLOYMENT_TOKEN

if [ -z "$DEPLOYMENT_TOKEN" ]; then
    echo -e "${RED}Error: No deployment token provided${NC}"
    exit 1
fi

# Step 3: Install dependencies
echo -e "\n${GREEN}Installing dependencies...${NC}"
npm install || { echo -e "${RED}Failed to install dependencies${NC}"; exit 1; }

# Step 4: Build the project
echo -e "\n${GREEN}Building project...${NC}"
npm run build || { echo -e "${RED}Build failed${NC}"; exit 1; }

# Step 5: Deploy
echo -e "\n${GREEN}Deploying to Azure...${NC}"
echo -e "Using configuration from your GitHub workflow:"
echo -e "- App location: /"
echo -e "- Output location: dist"
echo -e "- API location: (none)"

swa deploy ./dist \
    --deployment-token $DEPLOYMENT_TOKEN \
    --env production

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}Deployment successful!${NC}"
    echo -e "Your website is now live at: ${BLUE}https://campuspe.com${NC}"
    echo -e "It may take a few minutes for changes to propagate."
else
    echo -e "\n${RED}Deployment failed. Please check the errors above.${NC}"
    exit 1
fi

# Optionally open the website
read -p "Would you like to open your website now? (y/n): " OPEN_WEBSITE
if [[ $OPEN_WEBSITE == "y" || $OPEN_WEBSITE == "Y" ]]; then
    open "https://campuspe.com"
fi
