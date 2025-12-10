import type { Metadata } from "next";

// Site-wide constants
export const SITE_CONFIG = {
  name: "Swamy's Hot Foods",
  shortName: "Swamy's",
  description:
    "Experience the finest South Indian delicacies, traditional recipes, and authentic flavors at Swamy's Hot Foods. Serving pure vegetarian cuisine since 1944 in Nellore.",
  url: "https://swamyshotfoods.in",
  ogImage: "/og-image.png",
  logo: "/logo.png",
  phone: "+919642415385",
  address: {
    street: "7-1-931, Opp. Nellore railway station, Railway feeders road",
    city: "Nellore",
    state: "Andhra Pradesh",
    postalCode: "524001",
    country: "India",
  },
  hours: {
    weekday: "Monday - Saturday: 5:30 AM - 11:00 AM, 4:30 PM - 9:00 PM",
    weekend: "Sunday: Closed",
  },
  social: {
    // Add social media handles if available
    // facebook: "https://facebook.com/swamyshotfoods",
    // instagram: "https://instagram.com/swamyshotfoods",
  },
  keywords: [
    "South Indian food",
    "vegetarian restaurant",
    "Nellore restaurant",
    "authentic South Indian cuisine",
    "pure vegetarian",
    "traditional recipes",
    "idli",
    "dosa",
    "vada",
    "sambar",
    "South Indian breakfast",
    "Andhra Pradesh food",
  ],
};

// Helper function to generate page metadata
export function generatePageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const image = ogImage || SITE_CONFIG.ogImage;
  const fullTitle = title.includes(SITE_CONFIG.name)
    ? title
    : `${title} | ${SITE_CONFIG.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [...SITE_CONFIG.keywords, ...keywords],
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
