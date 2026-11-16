import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { HowItWorks } from "@/components/site/how-it-works";
import { Services } from "@/components/site/services";
import { WhyChooseUs } from "@/components/site/why-choose-us";
import { Fleet } from "@/components/site/fleet";
import { Coverage } from "@/components/site/coverage";
import { Routes } from "@/components/site/routes";
import { FareCalculator } from "@/components/site/fare-calculator";
import { Testimonials } from "@/components/site/testimonials";
import { About } from "@/components/site/about";
import { Faq } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <HowItWorks />
        <Services />
        <WhyChooseUs />
        <Fleet />
        <Coverage />
        <Routes />
        <FareCalculator />
        <Testimonials />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
