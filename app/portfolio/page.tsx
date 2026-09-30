import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudies from "@/components/case-studies/CaseStudies";
import { PortfolioData } from "@/components/PortfolioCard";
import { Sparkles } from "lucide-react";

async function getPortfolioItems(): Promise<PortfolioData[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/portfolio`,
      {
        cache: "no-store",
      }
    );
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

export default async function PortfolioPage() {
  const items = await getPortfolioItems();

  return (
    <div className="min-h-screen bg-vfx-light bg-vfx-grid-light text-slate-900 selection:bg-cyan-500 selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-36 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-300/40 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Interactive Case Studies</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Our Client Impact Portfolio
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Discover how TRONX AI accelerates digital transformation across Hospitality, Healthcare, Education, Real Estate, and Corporate sectors.
          </p>
        </div>
      </section>

      {/* Interactive Case Studies Section Stage */}
      <CaseStudies initialData={items} />

      <Footer />
    </div>
  );
}
