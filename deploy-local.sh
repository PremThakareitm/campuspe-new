#!/bin/bash

# This script helps deploy your Static Web App locally
# You need to have the Azure CLI and Static Web Apps CLI installed

# Step 1: Install the required tools if not already installed
echo "Checking for required tools..."
if ! command -v az &> /dev/null; then
    echo "Azure CLI not found. Installing..."
    brew update && brew install azure-cli
else
    echo "Azure CLI is installed"
fi

if ! command -v swa &> /dev/null; then
    echo "Static Web Apps CLI not found. Installing..."
    npm install -g @azure/static-web-apps-cli
else
    echo "Static Web Apps CLI is installed"
fi

# Step 2: Login to Azure
echo "Please login to your Azure account..."
az login

# Step 3: Build the project
echo "Building the project..."
npm run build

# Step 4: Deploy using SWA CLI
echo "Deploying to Azure Static Web Apps..."
# You'll need your deployment token from Azure Portal
read -p "Enter your Static Web Apps deployment token: " DEPLOYMENT_TOKEN

swa deploy ./dist --deployment-token $DEPLOYMENT_TOKEN --env production

echo "Deployment complete!"
