import type { Metadata } from "next";
import { generatePageMetadata } from "../page-metadata";
import {
  getAboutPageSchema,
  getBreadcrumbSchema,
  generateJsonLd,
} from "@/lib/structured-data";

// Generate metadata for about page
export const metadata: Metadata = generatePageMetadata({
  title: "About Us - 80+ Years of Authentic South Indian Cuisine",
  description:
    "Discover the rich 80+ year history of Swamy's Hot Foods, a family-run South Indian vegetarian restaurant in Nellore since 1944. Three generations of culinary excellence and tradition.",
  path: "/about",
  keywords: [
    "about Swamy's Hot Foods",
    "Nellore restaurant history",
    "family restaurant",
    "since 1944",
    "South Indian heritage",
    "traditional restaurant",
    "Konkani Brahmin cuisine",
  ],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const aboutPageSchema = getAboutPageSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://swamyshotfoods.in" },
    { name: "About", url: "https://swamyshotfoods.in/about" },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(aboutPageSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)}
      />
      {children}
    </>
  );
}
