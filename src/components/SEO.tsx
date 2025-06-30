import { Helmet } from 'react-helmet-async';

const SEO = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://campuspe.com/#website",
        "url": "https://campuspe.com/",
        "name": "CampusPE",
        "description": "AI-powered campus assistant for college discovery and placements",
        "publisher": {
          "@id": "https://campuspe.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://campuspe.com/?s={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": "https://campuspe.com/#organization",
        "name": "CampusPE",
        "alternateName": "Campus PE",
        "url": "https://campuspe.com/",
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": "https://campuspe.com/#/schema/logo/image/",
          "url": "https://campuspe.com/logo.png",
          "contentUrl": "https://campuspe.com/logo.png",
          "width": 512,
          "height": 512,
          "caption": "CampusPE"
        },
        "image": {
          "@id": "https://campuspe.com/#/schema/logo/image/"
        },
        "sameAs": [
          "https://www.linkedin.com/company/campuspe",
          "https://twitter.com/campuspe",
          "https://www.instagram.com/campuspe"
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://campuspe.com/#webpage",
        "url": "https://campuspe.com/",
        "name": "CampusPE - AI-Powered Campus Assistant | Future of College Life",
        "isPartOf": {
          "@id": "https://campuspe.com/#website"
        },
        "about": {
          "@id": "https://campuspe.com/#organization"
        },
        "description": "Join CampusPE waitlist for the revolutionary AI-powered campus assistant. Transforming college discovery, placements, and campus life with cutting-edge AI technology.",
        "breadcrumb": {
          "@id": "https://campuspe.com/#breadcrumb"
        },
        "inLanguage": "en-US",
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": [
              "https://campuspe.com/"
            ]
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Additional meta tags for better SEO */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      
      {/* Preconnect to external domains for better performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* Prefetch DNS for external resources */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    </Helmet>
  );
};

export default SEO;
