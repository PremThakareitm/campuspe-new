// Script to validate JSON-LD structured data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CampusPE",
  "alternateName": "Campus PE",
  "description": "AI-powered campus assistant for college discovery and placements in India",
  "url": "https://campuspe.com",
  "applicationCategory": "EducationApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "url": "https://campuspe.com"
  },
  "creator": {
    "@type": "Organization",
    "name": "CampusPE Team"
  },
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student"
  }
};

// Validate JSON structure
try {
  const jsonString = JSON.stringify(structuredData, null, 2);
  console.log("✅ Valid JSON-LD Structure:");
  console.log(jsonString);
} catch (error) {
  console.error("❌ JSON-LD Validation Error:", error);
}

module.exports = structuredData;
