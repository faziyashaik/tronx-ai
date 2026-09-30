"use client";

import { motion } from "framer-motion";
import { Star, Quote, User } from "lucide-react";
import Image from "next/image";

export interface TestimonialData {
  _id?: string;
  name: string;
  company?: string;
  role?: string;
  content: string;
  image?: string;
  rating?: number;
  published?: boolean;
}

const fallbackTestimonials: TestimonialData[] = [
  {
    name: "Alex Thorne",
    company: "Apex Hospitality Group",
    role: "Managing Director",
    content:
      "TRONX AI delivered a stunning 360° virtual tour and NFC menu solution that completely transformed our dining customer engagement. Bookings skyrocketed by 40% in two months.",
    rating: 5,
  },
  {
    name: "Dr. Elena Rostova",
    company: "MedTech Innovations",
    role: "Chief Operating Officer",
    content:
      "Their AI WhatsApp automation and high-speed web application automated 80% of patient inquiries overnight. The TRONX team operates with incredible speed and precision.",
    rating: 5,
  },
  {
    name: "Marcus Vance",
    company: "Vance Luxury Real Estate",
    role: "Founder & CEO",
    content:
      "The 4K FPV drone walkthroughs combined with targeted Google Business Profile optimization set our property listings leagues ahead of the competition. Highly recommended!",
    rating: 5,
  },
];

export default function TestimonialSlider({
  testimonials = [],
}: {
  testimonials?: TestimonialData[];
}) {
  const list = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((item, index) => (
        <motion.div
          key={item._id || index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative rounded-3xl vfx-glass-light p-7 sm:p-8 flex flex-col justify-between vfx-glass-light-hover"
        >
          {/* Quote Mark */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <Quote className="w-8 h-8 text-slate-300 group-hover:text-cyan-500 transition-colors" />
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-8">
              &quot;{item.content}&quot;
            </p>
          </div>

          {/* Author info */}
          <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/80">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-100 border border-slate-300 shrink-0 flex items-center justify-center">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-cyan-600" />
              )}
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                {item.name}
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                {item.role ? `${item.role}, ` : ""}
                <span className="text-slate-800 font-bold">
                  {item.company}
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
