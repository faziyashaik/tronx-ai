"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FAQData {
  _id?: string;
  question: string;
  answer: string;
  published?: boolean;
  order?: number;
}

const fallbackFAQs: FAQData[] = [
  {
    question: "What makes TRONX AI different from traditional digital agencies?",
    answer:
      "We fuse cutting-edge AI automation, custom 24/7 intelligent agents, immersive 360° virtual tours, and cinematic FPV drone media into a unified growth engine tailored for enterprise results.",
  },
  {
    question: "How long does a typical consultancy project take from start to finish?",
    answer:
      "Our rapid execution framework delivers core solution deployments in 2 to 4 weeks, backed by continuous post-launch optimization.",
  },
  {
    question: "How does the Google Business Profile (GMB) & 360° Virtual Tour integration work?",
    answer:
      "Our certified team shoots high-definition 360° imagery directly mapped to your Google Maps listing, optimizing local search signals to boost customer engagement.",
  },
  {
    question: "Can custom AI automation integrate into our existing CRM and workflow software?",
    answer:
      "Yes! Our AI agents seamlessly connect with major CRMs, custom databases, WhatsApp Business APIs, and backend systems with full end-to-end security.",
  },
];

export default function FAQAccordion({ faqs = [] }: { faqs?: FAQData[] }) {
  const list = faqs.length > 0 ? faqs : fallbackFAQs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {list.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={faq._id || index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? "bg-white border-cyan-400 shadow-xl shadow-cyan-500/10"
                : "bg-white/70 border-slate-200 hover:border-slate-300"
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 pr-4">
                <span className="text-xs font-mono font-bold text-cyan-600">0{index + 1}</span>
                <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? "text-cyan-600" : "text-slate-400"}`} />
                <span className="text-base sm:text-lg font-bold text-slate-900">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-cyan-600" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
