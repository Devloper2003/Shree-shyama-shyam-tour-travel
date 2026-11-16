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
  title: "Shree Shyama Shyam Tour and Travels | Private Cab Service All Over India",
  description:
    "Shree Shyama Shyam Tour and Travels offers reliable private cab services across all over India. Book Sedan, SUV, Innova, Tempo Traveller for outstation, local, airport transfers. 24x7 verified drivers, transparent pricing.",
  keywords: [
    "private cab service India",
    "outstation taxi",
    "Shree Shyama Shyam Tour and Travels",
    "Innova on rent",
    "Tempo Traveller booking",
    "airport taxi India",
    "intercity cab",
    "India cab service",
  ],
  authors: [{ name: "Shree Shyama Shyam Tour and Travels" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Shree Shyama Shyam Tour and Travels | Private Cab Service All Over India",
    description:
      "Reliable private cab services across India. Sedan, SUV, Innova, Tempo Traveller. 24x7 service, verified drivers, transparent pricing.",
    siteName: "Shree Shyama Shyam Tour and Travels",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Shyama Shyam Tour and Travels",
    description: "Private Cab Service All Over India — 24x7 verified drivers, transparent pricing.",
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
