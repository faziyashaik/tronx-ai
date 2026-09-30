"use client";

import { useEffect, useRef } from "react";

export default function VFXBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    interface SparseParticle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }

    let particles: SparseParticle[] = [];
    const colors = ["#06B6D4", "#8B5CF6", "#3B82F6"];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Low density particle count (8-12 subtle particles max)
      const count = Math.min(Math.floor((width * height) / 120000), 12);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.8,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.25 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const ro = new ResizeObserver(resize);
    ro.observe(document.body);
    resize();

    let isPaused = false;

    const render = () => {
      if (isPaused) return;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true;
        cancelAnimationFrame(animId);
      } else {
        isPaused = false;
        animId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft, subtle light atmospheric glow orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-[30%] right-[-120px] w-[500px] h-[500px] bg-gradient-to-br from-violet-400/15 via-indigo-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-[-100px] left-[20%] w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/10 via-pink-400/10 to-transparent rounded-full blur-3xl" />

      {/* Sparse, subtle particle canvas background */}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
