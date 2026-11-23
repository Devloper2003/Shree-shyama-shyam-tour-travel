"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import { ScrollableTabs } from "@/components/site/scrollable-tabs";
import { faqs, faqCategories, type FaqCategory } from "@/lib/site-data";

type TabKey = "all" | FaqCategory;

export function Faq() {
  const [active, setActive] = useState<TabKey>("all");

  const filtered =
    active === "all" ? faqs : faqs.filter((f) => f.category === active);

  return (
    <section
      id="faq"
      className="py-16 sm:py-20 lg:py-24 bg-muted/40"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3">
            <HelpCircle className="w-3 h-3 mr-1" /> Pilgrimage FAQ
          </Badge>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Your Braj Yatra Questions Answered
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Everything you need to know before embarking on your sacred Braj pilgrimage. Browse
            by category to find what matters most to you. Can&apos;t find your question? Just
            reach out — we are happy to help.
          </p>
        </div>

        {/* Scrollable uniform-width tabs with left/right navigation */}
        <ScrollableTabs
          tabs={faqCategories}
          active={active}
          onChange={(k) => setActive(k as TabKey)}
          layoutId="faq-tab"
          tabWidth={175}
        />

        {/* FAQ accordion with animated transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {filtered.map((f, i) => (
                <AccordionItem
                  key={`${active}-${i}`}
                  value={`item-${i}`}
                  className="bg-background mb-2 rounded-lg px-4 border border-border"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
