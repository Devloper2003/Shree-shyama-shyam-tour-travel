import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shree Shyama Shyam Tour and Travels | Sacred Braj Yatra & Pilgrimage Tours",
  description:
    "Shree Shyama Shyam Tour and Travels offers sacred Braj Yatra pilgrimage tours covering Mathura, Vrindavan, Gokul, Barsana, Nandgaon, Govardhan and the complete 84-kosa Braj Mandala. Same-day, 2-day, 3-day packages with verified drivers and local Braj guides.",
  keywords: [
    "Braj Yatra",
    "Brij Yatra",
    "Mathura Vrindavan tour",
    "Krishna Janmabhoomi darshan",
    "Banke Bihari temple",
    "Govardhan Parikrama",
    "Barsana Nandgaon yatra",
    "Braj Mandala pilgrimage",
    "Shree Shyama Shyam",
    "Radha Krishna pilgrimage",
  ],
  authors: [{ name: "Shree Shyama Shyam Tour and Travels" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Shree Shyama Shyam Tour and Travels | Sacred Braj Yatra",
    description:
      "Sacred Braj Yatra pilgrimage tours — Mathura, Vrindavan, Gokul, Barsana, Nandgaon, Govardhan. Same-day to 3-day packages with verified drivers and local guides.",
    siteName: "Shree Shyama Shyam Tour and Travels",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Shyama Shyam Tour and Travels",
    description: "Sacred Braj Yatra pilgrimage tours across the holy Braj Mandala.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
