"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import { faqs } from "@/lib/site-data";

export function Faq() {
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
            Everything you need to know before booking. Can&apos;t find your question? Just
            reach out — we are happy to help.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-background mb-2 rounded-lg px-4 border border-border">
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
      </div>
    </section>
  );
}
