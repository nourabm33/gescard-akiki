import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Montserrat } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BackToTop from "@/components/BackToTop";
import { profile } from "@/data/profile";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import "./globals.css";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cinzel", display: "swap" });

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });

const description =
  "Gescard Akiki, Senior Property Consultant at RichKey Properties, specialises in off-plan real estate in Dubai and Abu Dhabi.";

const siteTitle = `${profile.name} | Dubai & Abu Dhabi Off-Plan Property`;

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: { default: siteTitle, template: `%s | ${profile.name}` },
  description,
  applicationName: `${profile.name} | UAE Real Estate`,
  authors: [{ name: profile.name }],
  keywords: [
    "Dubai off-plan property",
    "Abu Dhabi off-plan property",
    "Gescard Akiki",
    "RichKey Properties",
  ],
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: `${profile.name} | UAE Real Estate`,
    title: siteTitle,
    description,
    locale: "en_GB",
    images: [{ url: absoluteUrl("/og-image.jpg"), width: 1200, height: 630, alt: `${profile.name}, ${profile.title}` }],
  },
  twitter: { card: "summary_large_image", title: siteTitle, description, images: [absoluteUrl("/og-image.jpg")] },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#300719",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: `${profile.title} with ${profile.agency.name}.`,
  url: absoluteUrl("/"),
  image: absoluteUrl("/images/gescard/office-portrait-800.webp"),
  email: `mailto:${profile.email}`,
  telephone: profile.phone.e164,
  worksFor: { "@type": "Organization", name: profile.agency.name },
  workLocation: {
    "@type": "Place",
    address: { "@type": "PostalAddress", streetAddress: "Dubai Hills Business Park, Building 4, 2nd Floor", addressLocality: "Dubai", addressCountry: "AE" },
  },
  knowsAbout: ["Off-plan real estate", "Dubai real estate", "Abu Dhabi real estate"],
  sameAs: [profile.socials.instagram.url, profile.socials.youtube.url],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer />
        <BackToTop />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
