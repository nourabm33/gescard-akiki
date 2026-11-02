import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { profile } from "@/data/profile";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const description =
  "Gescard Akiki, Dubai real estate consultant with RichKey Properties. Personalised guidance for Dubai property investment, apartments and villas.";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: { default: `${profile.name} | Dubai Real Estate Consultant`, template: `%s | ${profile.name}` },
  description,
  applicationName: `${profile.name} | Dubai Real Estate`,
  authors: [{ name: profile.name }],
  keywords: [
    "Dubai real estate consultant",
    "Dubai property investment",
    "Dubai apartments and villas",
    "property investment opportunities in Dubai",
    "Gescard Akiki Dubai real estate",
  ],
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: `${profile.name} | Dubai Real Estate`,
    title: `${profile.name} | Dubai Real Estate Consultant`,
    description,
    locale: "en_GB",
    images: [{ url: absoluteUrl("/og-image.jpg"), width: 1200, height: 630, alt: `${profile.name}, ${profile.title}` }],
  },
  twitter: { card: "summary_large_image", title: `${profile.name} | Dubai Real Estate Consultant`, description, images: [absoluteUrl("/og-image.jpg")] },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#151719",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Real Estate Consultant",
  description: `${profile.title} with ${profile.agency.name}.`,
  url: absoluteUrl("/"),
  image: absoluteUrl("/images/gescard/gescard-portrait-800.webp"),
  email: `mailto:${profile.email}`,
  telephone: profile.phone.e164,
  worksFor: { "@type": "Organization", name: profile.agency.name },
  workLocation: {
    "@type": "Place",
    address: { "@type": "PostalAddress", streetAddress: "Dubai Hills Business Park, Building 4, 2nd Floor", addressLocality: "Dubai", addressCountry: "AE" },
  },
  knowsAbout: ["Dubai real estate", "Property investment", "Apartments", "Villas"],
  sameAs: [profile.socials.instagram.url, profile.socials.youtube.url],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
