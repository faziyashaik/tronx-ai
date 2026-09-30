"use client";

import { useState } from "react";
import PortfolioCard, { PortfolioData } from "@/components/PortfolioCard";

const categories = [
  "All",
  "Hospitality",
  "Hotels",
  "Healthcare",
  "Education",
  "Real Estate",
  "Corporate",
];

export default function PortfolioClient({ items }: { items: PortfolioData[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter(
          (item) =>
            item.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 focus:outline-none ${
                isActive
                  ? "bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-cyan-500/20"
                  : "bg-white/80 border border-slate-200 text-slate-700 hover:text-cyan-600 hover:bg-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <PortfolioCard key={item._id || idx} item={item} index={idx} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-500 bg-white/60 rounded-3xl border border-slate-200">
          <p className="text-lg font-medium">No portfolio projects found for &quot;{selectedCategory}&quot;.</p>
        </div>
      )}
    </div>
  );
}
