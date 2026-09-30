"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import { PortfolioData } from "@/components/PortfolioCard";
import CaseStudyStage from "./CaseStudyStage";
import { Loader2, AlertCircle } from "lucide-react";

interface CaseStudiesProps {
  initialData?: PortfolioData[];
}

const CATEGORIES = [
  "All",
  "Hospitality",
  "Hotels",
  "Healthcare",
  "Education",
  "Real Estate",
  "Corporate",
];

export default function CaseStudies({ initialData }: CaseStudiesProps) {
  const [items, setItems] = useState<PortfolioData[]>(initialData || []);
  const [loading, setLoading] = useState<boolean>(!initialData || initialData.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setItems(initialData);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/portfolio");
        if (!res.ok) throw new Error("Failed to load portfolio items");
        const json = await res.json();
        if (isMounted) {
          if (json.success && Array.isArray(json.data)) {
            setItems(json.data);
          } else {
            setItems([]);
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.error("Error loading case studies:", err);
          setError("Unable to load case studies at this moment.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPortfolio();

    return () => {
      isMounted = false;
    };
  }, [initialData]);

  // Filter items by category
  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter(
          (item) =>
            item.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionHeading
        eyebrow="OUR WORK · SELECTED TRANSFORMATIONS"
        title="Interactive Digital Case Studies"
        description="Experience how TRONX AI delivers AI automation, virtual tours, high-performance web systems, and digital growth across enterprise industries."
      />

      {/* Content States */}
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center space-y-4 rounded-3xl vfx-glass-light border border-slate-200/80">
          <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
          <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
            Loading TRONX Case Studies...
          </span>
        </div>
      ) : error ? (
        <div className="py-16 px-6 text-center space-y-3 rounded-3xl bg-red-50/50 border border-red-200 text-red-700">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-20 text-center space-y-4 rounded-3xl vfx-glass-light border border-slate-200/80">
          <p className="text-lg font-medium text-slate-600">
            No case studies found under &quot;{selectedCategory}&quot;.
          </p>
          {selectedCategory !== "All" && (
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              Reset Category Filter
            </button>
          )}
        </div>
      ) : (
        /* Main Interactive ThreeUI Inspired Stage */
        <CaseStudyStage
          items={filteredItems}
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />
      )}
    </section>
  );
}
