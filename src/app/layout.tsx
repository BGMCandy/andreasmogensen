import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

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
  description: "Unofficial fansite dedicated to Andreas Mogensen, the Danish astronaut",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        style={{ margin: 0, padding: 0 }}
      > 
        <Header />
        <main className="relative min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
