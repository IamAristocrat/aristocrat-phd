import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const editorial = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://phd.aristocratresearch.com"),
  title: { default: "PhD Forward | Your PhD. Progressed.", template: "%s | Aristocrat Research" },
  description:
    "Confidential, milestone-led thesis, manuscript, methodology, journal verification and reviewer-response support for PhD scholars.",
  openGraph: {
    title: "PhD Forward | Your PhD. Progressed.",
    description: "Confidential, milestone-led research support for PhD scholars.",
    siteName: "Aristocrat Research",
    type: "website",
    images: [{ url: "/aristocrat-alpha.png", width: 1254, height: 1254, alt: "Aristocrat Research alpha and ascent symbol" }],
  },
  category: "education",
  keywords: ["PhD support", "thesis support", "research paper publication support", "journal verification", "reviewer response", "viva preparation"],
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/aristocrat-alpha.png",
    shortcut: "/aristocrat-alpha.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${editorial.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
