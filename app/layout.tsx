import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://swamyshotfoods.in"),
  title: {
    default: "Swamy's Hot Foods - Authentic South Indian Cuisine Since 1944",
    template: "%s | Swamy's Hot Foods",
  },
  description:
    "Experience the finest South Indian delicacies, traditional recipes, and authentic flavors at Swamy's Hot Foods. Serving pure vegetarian cuisine since 1944 in Nellore.",
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
    "Swamy's Hot Foods",
    "Nellore food",
  ],
  authors: [{ name: "Swamy's Hot Foods" }],
  creator: "Swamy's Hot Foods",
  publisher: "Swamy's Hot Foods",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://swamyshotfoods.in",
    siteName: "Swamy's Hot Foods",
    title: "Swamy's Hot Foods - Authentic South Indian Cuisine Since 1944",
    description:
      "Experience the finest South Indian delicacies, traditional recipes, and authentic flavors at Swamy's Hot Foods.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Swamy's Hot Foods - Authentic South Indian Cuisine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swamy's Hot Foods - Authentic South Indian Cuisine Since 1944",
    description:
      "Experience the finest South Indian delicacies, traditional recipes, and authentic flavors at Swamy's Hot Foods.",
    images: ["/og-image.png"],
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
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

// Viewport configuration (Next.js 16+ requires separate export)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${lora.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
