import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Player from "./components/musicPlayer/player";
import StructuredData from "./components/seo/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andreas Mogensen - Unofficial Fansite",
  description: "Unofficial fansite dedicated to Andreas Mogensen, the Danish ESA astronaut. Learn about his space missions, training, and achievements in space exploration.",
  keywords: [
    "Andreas Mogensen",
    "Danish astronaut",
    "ESA astronaut",
    "International Space Station",
    "ISS",
    "space exploration",
    "astronaut biography",
    "European Space Agency",
    "space missions",
    "astronaut training"
  ],
  authors: [{ name: "Andreas Mogensen Fansite" }],
  creator: "Andreas Mogensen Fansite",
  publisher: "Andreas Mogensen - Unofficial Fansite",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://andreasmogensen.dk",
    title: "Andreas Mogensen - Unofficial Fansite",
    description: "Unofficial fansite dedicated to Andreas Mogensen, the Danish ESA astronaut. Learn about his space missions, training, and achievements in space exploration.",
    siteName: "Andreas Mogensen - Unofficial Fansite",
    images: [
      {
        url: "https://andreasmogensen.dk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Andreas Mogensen - Danish ESA Astronaut",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@andreasmogensen",
    creator: "@andreasmogensen",
    title: "Andreas Mogensen - Unofficial Fansite",
    description: "Unofficial fansite dedicated to Andreas Mogensen, the Danish ESA astronaut. Learn about his space missions, training, and achievements in space exploration.",
    images: ["https://andreasmogensen.dk/og-image.jpg"],
  },
  alternates: {
    canonical: "https://andreasmogensen.dk",
  },
  other: {
    "article:author": "Andreas Mogensen Fansite",
    "article:publisher": "Andreas Mogensen - Unofficial Fansite",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Andreas Mogensen - Unofficial Fansite",
    description: "Unofficial fansite dedicated to Andreas Mogensen, the Danish ESA astronaut. Learn about his space missions, training, and achievements in space exploration.",
    url: "https://andreasmogensen.dk",
    author: {
      "@type": "Person",
      name: "Andreas Mogensen Fansite",
    },
    publisher: {
      "@type": "Organization",
      name: "Andreas Mogensen - Unofficial Fansite",
      url: "https://andreasmogensen.dk",
    },
    image: "https://andreasmogensen.dk/og-image.jpg",
    inLanguage: "en-US",
  };

  return (
    <html lang="en">
      <head>
        <StructuredData data={structuredData} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden min-h-screen relative`}
        style={{ margin: 0, padding: 0 }}
      > 
        <Header />
        <main className="relative">
          <Player />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
