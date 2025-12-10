import { SITE_CONFIG } from "@/app/page-metadata";

// LocalBusiness Schema for Home Page
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_CONFIG.url}/#restaurant`,
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    servesCuisine: "South Indian",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "14.4426", // Nellore coordinates
      longitude: "79.9865",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "05:30",
        closes: "11:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "16:30",
        closes: "21:00",
      },
    ],
    sameAs: Object.values(SITE_CONFIG.social).filter(Boolean),
  };
}

// Organization Schema
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Telugu", "Hindi"],
    },
    foundingDate: "1944",
    sameAs: Object.values(SITE_CONFIG.social).filter(Boolean),
  };
}

// Menu Schema for Menu Page
export function getMenuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${SITE_CONFIG.name} Menu`,
    description: "Authentic South Indian vegetarian cuisine menu",
    inLanguage: "en-IN",
    provider: {
      "@type": "Restaurant",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}

// BreadcrumbList Schema
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// AboutPage Schema
export function getAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${SITE_CONFIG.name}`,
    description:
      "Learn about our 80+ year legacy of serving authentic South Indian vegetarian cuisine in Nellore since 1944.",
    url: `${SITE_CONFIG.url}/about`,
    mainEntity: {
      "@type": "Restaurant",
      name: SITE_CONFIG.name,
      foundingDate: "1944",
      description: SITE_CONFIG.description,
    },
  };
}

// Helper to inject JSON-LD script
export function generateJsonLd(schema: object) {
  return {
    __html: JSON.stringify(schema),
  };
}
