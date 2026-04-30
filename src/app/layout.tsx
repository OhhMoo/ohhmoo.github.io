import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--ff-body",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexCondensed = IBM_Plex_Sans_Condensed({
  variable: "--ff-label",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Michael Yao",
    template: "%s",
  },
  description: "Chemistry & computer-science student at Harvey Mudd. Atoms and algorithms.",
  openGraph: {
    title: "Michael Yao",
    description: "Chemistry & computer-science student at Harvey Mudd. Atoms and algorithms.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Yao",
    description: "Chemistry & computer-science student at Harvey Mudd. Atoms and algorithms.",
  },
  icons: {
    icon: [
      { url: "/seo/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/seo/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/seo/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/seo/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/seo/apple-touch-icon.png",
    shortcut: "/seo/favicon-32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${ibmPlexCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
