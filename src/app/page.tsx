"use client";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { HomePage } from "@/components/site/pages/home-page";
import { PackagePage } from "@/components/site/pages/package-page";
import { ServicesPage } from "@/components/site/pages/services-page";
import { BlogsPage } from "@/components/site/pages/blogs-page";
import { ContactPage } from "@/components/site/pages/contact-page";
import { AboutPage } from "@/components/site/pages/about-page";
import { usePageStore } from "@/lib/page-store";

export default function Home() {
  const currentPage = usePageStore((s) => s.currentPage);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {currentPage === "home" && <HomePage />}
        {currentPage === "package" && <PackagePage />}
        {currentPage === "services" && <ServicesPage />}
        {currentPage === "blogs" && <BlogsPage />}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "about" && <AboutPage />}
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
