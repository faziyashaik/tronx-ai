"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Cpu, Activity } from "lucide-react";

export default function AIQuantumCore() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [scrollScale, setScrollScale] = useState(1);

  // Handle scroll-out dissolve effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 500;
      if (scrollY < threshold) {
        const progress = scrollY / threshold;
        setScrollOpacity(1 - progress * 0.75);
        setScrollScale(1 - progress * 0.15);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    // Pointer lerp state
    const pointer = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      isOver: false,
    };

    // 3D Particles & Nodes definition
    interface Point3D {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      size: number;
      color: string;
      alpha: number;
      pulseOffset: number;
      orbitSpeed: number;
    }

    interface Connection {
      p1Index: number;
      p2Index: number;
      pulsePos: number;
      pulseSpeed: number;
    }

    const points: Point3D[] = [];
    const connections: Connection[] = [];
    const colors = ["#06B6D4", "#8B5CF6", "#3B82F6", "#EC4899", "#F59E0B", "#FFFFFF"];

    const radius = 140;
    const particleCount = 180;

    // Generate 3D Quantum Neural Sphere Points
    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution over sphere surface
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      // Add controlled random jitter for computational neural texture
      const r = radius + (Math.random() - 0.5) * 20;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      points.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        size: Math.random() * 2.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.5,
        pulseOffset: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // Build neural connections between close 3D nodes
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].baseX - points[j].baseX;
        const dy = points[i].baseY - points[j].baseY;
        const dz = points[i].baseZ - points[j].baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 42) {
          connections.push({
            p1Index: i,
            p2Index: j,
            pulsePos: Math.random(),
            pulseSpeed: Math.random() * 0.015 + 0.005,
          });
        }
      }
    }

    // Rotation angles
    let autoRotY = 0;
    let autoRotX = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = Math.floor(rect.width * dpr);
      height = Math.floor(rect.height * dpr);
      canvas.width = width;
      canvas.height = height;
      ctx.scale(dpr, dpr);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      pointer.targetX = y * 0.8; // Tilt X
      pointer.targetY = x * 0.8; // Tilt Y
      pointer.isOver = true;
    };

    const handleMouseLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
      pointer.isOver = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let isPaused = false;

    // Main 3D Render Loop
    const render = (time: number) => {
      if (isPaused || document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      const cssW = canvas.width / (window.devicePixelRatio || 1);
      const cssH = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, cssW, cssH);

      const centerX = cssW / 2;
      const centerY = cssH / 2;

      // Autonomous rotation + Pointer Lerp
      autoRotY += 0.006;
      autoRotX += 0.002;

      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.05;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.05;

      const rotX = autoRotX + pointer.currentX;
      const rotY = autoRotY + pointer.currentY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // 1. Draw Central Luminous Core Halo
      const corePulse = Math.sin(time * 0.002) * 6;
      const coreRadius = 45 + corePulse;
      const coreGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        coreRadius * 2
      );
      coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      coreGrad.addColorStop(0.2, "rgba(6, 182, 212, 0.8)");
      coreGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.5)");
      coreGrad.addColorStop(0.8, "rgba(236, 72, 153, 0.2)");
      coreGrad.addColorStop(1, "rgba(6, 182, 212, 0)");

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      // 2. Transform 3D Points
      const projectedPoints: { x: number; y: number; z: number; pt: Point3D }[] = [];

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // Orbit rotation
        pt.pulseOffset += pt.orbitSpeed;
        const currentRadius = radius + Math.sin(time * 0.0015 + pt.pulseOffset) * 12;

        const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i + pt.pulseOffset;

        const bx = currentRadius * Math.sin(phi) * Math.cos(theta);
        const by = currentRadius * Math.sin(phi) * Math.sin(theta);
        const bz = currentRadius * Math.cos(phi);

        // Rotate Y
        const x1 = bx * cosY - bz * sinY;
        const z1 = bx * sinY + bz * cosY;

        // Rotate X
        const y2 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;

        // Perspective Projection
        const fov = 340;
        const perspective = fov / (fov + z2);
        const projX = centerX + x1 * perspective;
        const projY = centerY + y2 * perspective;

        projectedPoints.push({ x: projX, y: projY, z: z2, pt });
      }

      // 3. Draw Translucent Orbital HUD Rings
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotY * 0.5);

      ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.3, radius * 0.45, rotX * 0.4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(139, 92, 246, 0.35)";
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.45, radius * 0.35, -rotX * 0.6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // 4. Draw Neural Connection Lines & Light Pulses
      for (let i = 0; i < connections.length; i++) {
        const conn = connections[i];
        const p1 = projectedPoints[conn.p1Index];
        const p2 = projectedPoints[conn.p2Index];

        // Draw connection only if both nodes are visible
        if (p1 && p2 && p1.z > -radius * 0.8 && p2.z > -radius * 0.8) {
          const avgZ = (p1.z + p2.z) / 2;
          const lineAlpha = ((avgZ + radius) / (2 * radius)) * 0.35;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Traveling Data Light Pulse
          conn.pulsePos = (conn.pulsePos + conn.pulseSpeed) % 1;
          const px = p1.x + (p2.x - p1.x) * conn.pulsePos;
          const py = p1.y + (p2.y - p1.y) * conn.pulsePos;

          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. Draw 3D Neural Nodes (Sorted back-to-front by Z depth)
      projectedPoints.sort((a, b) => a.z - b.z);

      for (let i = 0; i < projectedPoints.length; i++) {
        const { x, y, z, pt } = projectedPoints[i];
        const depthScale = Math.max(0.3, (z + radius * 1.5) / (2.5 * radius));

        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha * depthScale;

        // Node Glow
        ctx.beginPath();
        ctx.arc(x, y, pt.size * depthScale * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.fill();

        // Node Bright Core
        ctx.beginPath();
        ctx.arc(x, y, pt.size * depthScale * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        opacity: scrollOpacity,
        transform: `scale(${scrollScale})`,
        transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
      }}
      className="relative w-full h-[460px] sm:h-[560px] rounded-3xl overflow-hidden bg-slate-950/90 border border-cyan-500/40 shadow-2xl group"
    >
      {/* Background High-Contrast Light Glow Orbs inside container */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-violet-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Main 3D Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block relative z-10 cursor-grab active:cursor-grabbing"
        aria-label="TRONX AI 3D Quantum Neural Intelligence Core"
      />

      {/* Top HUD Technical Details */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/50 text-[10px] font-mono font-bold text-cyan-400 shadow-lg backdrop-blur-md">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>QUANTUM NEURAL ENGINE v4.0</span>
        </div>
        <div className="text-[11px] font-mono text-slate-400 pl-1 hidden sm:block">
          SYS_STATUS: AUTONOMOUS · 180 NEURAL NODES ONLINE
        </div>
      </div>

      {/* Bottom Interactive Guidance Pill */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-[11px] font-mono font-semibold text-slate-300 backdrop-blur-md shadow-md">
        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
        <span>MOVE CURSOR TO TILT CORE</span>
      </div>
    </div>
  );
}
