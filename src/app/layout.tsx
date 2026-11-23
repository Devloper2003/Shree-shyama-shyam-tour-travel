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
  title: "Shri Shyama Shyam Tour & Travels | Mathura Vrindavan Braj Yatra & Pilgrimage Tours",
  description:
    "Shri Shyama Shyam Tour & Travels in Mathura Vrindavan offers sacred Braj Yatra pilgrimage tours covering Mathura, Vrindavan, Gokul, Barsana, Nandgaon, Govardhan and the complete 84-kosa Braj Mandala. Same-day, 2N/3D, 4N/5D with Agra, 6N/7D with Jaipur & Khajuraho packages. Contact: 8319710872 (Vithika).",
  keywords: [
    "Braj Yatra",
    "Brij Yatra",
    "Mathura Vrindavan tour",
    "Shri Shyama Shyam Tour Travels",
    "Krishna Janmabhoomi darshan",
    "Banke Bihari temple",
    "Govardhan Parikrama",
    "Barsana Nandgaon yatra",
    "Braj Mandala pilgrimage",
    "Mathura pilgrimage tours",
    "Agra Mathura Vrindavan package",
    "Jaipur Khajuraho tour",
    "Radha Krishna pilgrimage",
  ],
  authors: [{ name: "Shri Shyama Shyam Tour & Travels" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Shri Shyama Shyam Tour & Travels | Mathura Vrindavan Braj Yatra",
    description:
      "Sacred Braj Yatra pilgrimage tours — Mathura, Vrindavan, Gokul, Barsana, Nandgaon, Govardhan. Same-day to 7-day packages with verified drivers and local guides. Call 8319710872.",
    siteName: "Shri Shyama Shyam Tour & Travels",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shri Shyama Shyam Tour & Travels",
    description: "Mathura Vrindavan Braj Yatra pilgrimage tours across the holy Braj Mandala.",
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
