"use client";

import { useEffect, useRef } from "react";

interface ServiceVFXCanvasProps {
  slug?: string;
  isHovered?: boolean;
}

export default function ServiceVFXCanvas({ slug, isHovered = false }: ServiceVFXCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    let isPaused = false;

    const render = () => {
      if (isPaused) return;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, width, height);

      time += isHovered ? 0.04 : 0.02;

      const centerX = width / 2;
      const centerY = height / 2;

      switch (slug) {
        case "ai-automation": {
          // 3D Neural Network Grid firing glowing pulses on hover
          ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
          ctx.lineWidth = 1;

          // Grid lines
          for (let x = 15; x < width; x += 25) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }
          for (let y = 15; y < height; y += 25) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }

          // Firing glowing pulses on hover
          const pulseCount = isHovered ? 8 : 4;
          for (let i = 0; i < pulseCount; i++) {
            const pTime = time * 1.5 + i * 1.2;
            const px = (pTime * 40) % width;
            const py = (pTime * 25) % height;

            const glow = ctx.createRadialGradient(px, py, 0, px, py, isHovered ? 20 : 10);
            glow.addColorStop(0, "rgba(6, 182, 212, 0.9)");
            glow.addColorStop(0.5, "rgba(139, 92, 246, 0.5)");
            glow.addColorStop(1, "rgba(6, 182, 212, 0)");

            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(px, py, isHovered ? 20 : 10, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }

        case "nfc-solutions": {
          // Sleek 3D NFC Card tilting and catching light reflections
          ctx.save();
          ctx.translate(centerX, centerY);
          const tiltAngle = Math.sin(time) * (isHovered ? 0.25 : 0.1);
          ctx.rotate(tiltAngle);

          // Card Body
          ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
          ctx.strokeStyle = "rgba(6, 182, 212, 0.6)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(-45, -28, 90, 56, 8);
          ctx.fill();
          ctx.stroke();

          // Light reflection sweep
          const sweepX = Math.sin(time * 2) * 50;
          const lightGrad = ctx.createLinearGradient(sweepX - 20, -30, sweepX + 20, 30);
          lightGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
          lightGrad.addColorStop(0.5, isHovered ? "rgba(6, 182, 212, 0.45)" : "rgba(255, 255, 255, 0.2)");
          lightGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.fillStyle = lightGrad;
          ctx.beginPath();
          ctx.roundRect(-45, -28, 90, 56, 8);
          ctx.fill();

          // NFC Waves Symbol
          ctx.strokeStyle = "rgba(6, 182, 212, 0.8)";
          ctx.lineWidth = 1.5;
          for (let r = 8; r <= 20; r += 6) {
            ctx.beginPath();
            ctx.arc(0, 0, r, -Math.PI / 3, Math.PI / 3);
            ctx.stroke();
          }

          ctx.restore();
          break;
        }

        case "virtual-tour-360": {
          // Isometric floating camera lens / abstract glass sphere rotating on axis
          ctx.save();
          ctx.translate(centerX, centerY);

          // Outer 360 rotation ring
          const rot = time * (isHovered ? 1.5 : 0.8);
          ctx.strokeStyle = "rgba(139, 92, 246, 0.7)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(0, 0, 48, 22, rot, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = "rgba(6, 182, 212, 0.8)";
          ctx.beginPath();
          ctx.ellipse(0, 0, 36, 16, -rot * 1.2, 0, Math.PI * 2);
          ctx.stroke();

          // Central Glass Lens Sphere
          const lensGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
          lensGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
          lensGrad.addColorStop(0.4, "rgba(6, 182, 212, 0.8)");
          lensGrad.addColorStop(1, "rgba(139, 92, 246, 0.6)");

          ctx.fillStyle = lensGrad;
          ctx.beginPath();
          ctx.arc(0, 0, 18, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
          break;
        }

        case "web-development": {
          // Multi-layered glass dashboards separating vertically on hover
          const sep = isHovered ? 14 : 6;
          const layerOffsetY = Math.sin(time) * 4;

          // Layer 3: Database (Bottom)
          ctx.fillStyle = "rgba(236, 72, 153, 0.15)";
          ctx.strokeStyle = "rgba(236, 72, 153, 0.5)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(centerX - 40, centerY - 15 + sep + layerOffsetY, 80, 30, 6);
          ctx.fill();
          ctx.stroke();

          // Layer 2: API Engine (Middle)
          ctx.fillStyle = "rgba(139, 92, 246, 0.2)";
          ctx.strokeStyle = "rgba(139, 92, 246, 0.6)";
          ctx.beginPath();
          ctx.roundRect(centerX - 40, centerY - 15 + layerOffsetY, 80, 30, 6);
          ctx.fill();
          ctx.stroke();

          // Layer 1: Frontend Interface (Top)
          ctx.fillStyle = "rgba(6, 182, 212, 0.25)";
          ctx.strokeStyle = "rgba(6, 182, 212, 0.8)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(centerX - 40, centerY - 15 - sep + layerOffsetY, 80, 30, 6);
          ctx.fill();
          ctx.stroke();
          break;
        }

        case "fpv-drone": {
          // Dynamic 3D FPV Drone trajectory path & glowing HUD ring
          ctx.beginPath();
          ctx.moveTo(15, height - 15);
          ctx.bezierCurveTo(
            width * 0.3,
            15 + Math.sin(time * 2) * 20,
            width * 0.7,
            height - Math.cos(time * 2) * 20,
            width - 15,
            15
          );
          ctx.strokeStyle = isHovered ? "rgba(6, 182, 212, 0.9)" : "rgba(6, 182, 212, 0.5)";
          ctx.lineWidth = isHovered ? 2.5 : 1.5;
          ctx.stroke();

          // Drone Headlight Pulse
          const headX = (time * 80) % width;
          ctx.fillStyle = "rgba(6, 182, 212, 1)";
          ctx.beginPath();
          ctx.arc(headX, centerY + Math.sin(headX * 0.05) * 15, 4, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        case "gmb-setup": {
          // Interactive Map Node Grid with Radar Pulse
          ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
          ctx.lineWidth = 1;
          for (let x = 20; x < width; x += 30) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }

          const pinY = centerY + Math.sin(time * 2) * 4;
          ctx.fillStyle = "rgba(6, 182, 212, 0.9)";
          ctx.beginPath();
          ctx.arc(centerX, pinY, 6, 0, Math.PI * 2);
          ctx.fill();

          // Ripple Ring
          const ripR = (time * 30) % 45;
          ctx.strokeStyle = `rgba(6, 182, 212, ${1 - ripR / 45})`;
          ctx.beginPath();
          ctx.arc(centerX, pinY, ripR, 0, Math.PI * 2);
          ctx.stroke();
          break;
        }

        default: {
          // Review Management Connected Reputation Nodes
          for (let i = 0; i < 5; i++) {
            const angle = time + (i * Math.PI * 2) / 5;
            const nx = centerX + Math.cos(angle) * (isHovered ? 34 : 26);
            const ny = centerY + Math.sin(angle) * (isHovered ? 34 : 26);

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(nx, ny);
            ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
            ctx.lineWidth = 1.2;
            ctx.stroke();

            ctx.fillStyle = "rgba(245, 158, 11, 0.9)";
            ctx.beginPath();
            ctx.arc(nx, ny, 4, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true;
        cancelAnimationFrame(animationFrameId);
      } else {
        isPaused = false;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [slug, isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-32 block rounded-2xl bg-white/50 border border-slate-200/70"
    />
  );
}
