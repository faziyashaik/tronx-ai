"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";
import { AnimatedBackground } from "@/components/core/animated-background";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Process", href: "/process" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Determine current active route for default highlight
  const currentActiveLink = navLinks.find((link) => link.href === pathname)?.href || navLinks[0].href;
  const [hoveredTab, setHoveredTab] = useState<string | null>(currentActiveLink);

  useEffect(() => {
    setHoveredTab(currentActiveLink);
  }, [pathname, currentActiveLink]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 rounded-full px-6 py-2.5 ${
            scrolled
              ? "bg-white/80 backdrop-blur-2xl border border-white/90 shadow-xl shadow-indigo-500/5"
              : "bg-white/50 backdrop-blur-md border border-white/70"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-violet-500/35 transition-all">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1">
                TRONX <span className="text-vfx-cyan-light font-bold">AI</span>
              </span>
              <span className="text-[9px] tracking-widest text-indigo-600/80 uppercase -mt-1 font-semibold">
                Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Animated Nav */}
          <nav
            className="hidden md:flex items-center"
            onMouseLeave={() => setHoveredTab(currentActiveLink)}
          >
            <AnimatedBackground
              defaultValue={hoveredTab || currentActiveLink}
              onValueChange={(id) => setHoveredTab(id)}
              className="rounded-full bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-violet-500/20 border border-cyan-400/50 shadow-sm backdrop-blur-md"
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.35,
              }}
              enableHover
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    data-id={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-xs font-extrabold tracking-wide transition-colors duration-200 rounded-full block ${
                      isActive
                        ? "text-slate-950 font-black"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </AnimatedBackground>
          </nav>

          {/* Book Consultation CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/book-consultation"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 shadow-lg shadow-indigo-500/20 hover:shadow-cyan-500/30 transition-all duration-300 light-sweep-white group"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-cyan-100" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden max-w-7xl mx-auto px-4 pt-3"
          >
            <div className="bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-3xl p-6 space-y-3 shadow-2xl">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-cyan-50 border border-cyan-200 text-cyan-700"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-3">
                <Link
                  href="/book-consultation"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-center font-bold text-sm text-white bg-gradient-to-r from-cyan-600 to-violet-600 shadow-lg"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
