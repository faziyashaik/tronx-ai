import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, ArrowLeft, ArrowUpRight, Layers, CheckCircle2 } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Portfolio from "@/lib/models/Portfolio";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;

  await connectDB();
  const project = await Portfolio.findOne({ slug }).lean();

  if (!project) {
    notFound();
  }

  const defaultImage =
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="min-h-screen bg-vfx-light bg-vfx-grid-light text-slate-900 selection:bg-cyan-500 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto space-y-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-cyan-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {project.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-300/40 text-xs font-bold text-cyan-800">
                <Layers className="w-3.5 h-3.5" />
                {project.category}
              </span>
            )}
            <span className="text-xs text-slate-500 font-mono">
              Updated {new Date(project.updatedAt || Date.now()).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            {project.title}
          </h1>

          {project.shortDescription && (
            <p className="text-lg text-slate-600 leading-relaxed">
              {project.shortDescription}
            </p>
          )}
        </div>
      </section>

      {/* Main Feature Image */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative h-[300px] sm:h-[480px] w-full rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl">
          <Image
            src={project.image || defaultImage}
            alt={project.title}
            fill
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* Details Body */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Project Overview</h2>
            <div className="text-base text-slate-600 leading-relaxed whitespace-pre-line space-y-4">
              {project.description || "Comprehensive solution delivered by TRONX AI Consultancy."}
            </div>
          </div>

          {/* Gallery Images if any */}
          {project.images && project.images.length > 0 && (
            <div className="space-y-4 pt-6">
              <h3 className="text-xl font-bold text-slate-900">Project Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.map((imgUrl: string, idx: number) => (
                  <div key={idx} className="relative h-48 rounded-2xl overflow-hidden border border-slate-200">
                    <Image src={imgUrl} alt={`${project.title} screenshot ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl vfx-glass-light p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
              Technical Stack
            </h3>

            {project.technologies && project.technologies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-300/40 text-xs font-mono text-cyan-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Full stack architecture</p>
            )}

            {project.ctaLink && (
              <div className="pt-4 border-t border-slate-200">
                <a
                  href={project.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 shadow-md transition-all"
                >
                  <span>{project.ctaText || "Visit Live Project"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
