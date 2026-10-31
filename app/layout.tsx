import type { Metadata, Viewport } from "next";
import { PwaRegister } from "@/components/PwaRegister";
import { CookieConsentCard } from "@/components/SitePreferences";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  title: {
    default: "OG Card Inspector — Free Social Preview & Meta Tag Checker",
    template: "%s | OG Card Inspector",
  },
  description:
    "Preview how your website links appear on X, LinkedIn, Discord, and Slack. Audit Open Graph tags, social images, titles, and descriptions for free.",
  applicationName: "OG Card Inspector",
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    title: "OG Card Inspector — Free Social Preview & Meta Tag Checker",
    description:
      "See how your links appear across social platforms and find the metadata issues that can cost you a click.",
    type: "website",
    siteName: "OG Card Inspector",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "OG Card Inspector — Free Social Preview & Meta Tag Checker",
    description:
      "Preview social cards and audit Open Graph metadata for your website, for free.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PwaRegister />
        <CookieConsentCard />
        {children}
      </body>
    </html>
  );
}
