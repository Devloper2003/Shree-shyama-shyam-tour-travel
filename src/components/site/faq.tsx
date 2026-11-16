"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
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
            <HelpCircle className="w-3 h-3 mr-1" /> FAQ
          </Badge>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Browse by category to find what matters most to you. Can&apos;t find your question?
            Just reach out — we are happy to help.
          </p>
        </div>

        {/* Animated category tabs */}
        <LayoutGroup>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {faqCategories.map((c) => {
              const isActive = active === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  aria-pressed={isActive}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive ? "text-primary-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="faq-tab-pill"
                      className="absolute inset-0 rounded-full bg-primary z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{c.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

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
