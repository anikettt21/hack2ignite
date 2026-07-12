"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from '@iconify/react';
import { playDingSound, playClickSound } from "../utils/sounds";

/* TODO: Replace with real Unstop registration link */
const REGISTER_URL = "https://unstop.com/placeholder-todo";

/* ── Falling block particles ─────────────────────────────────────── */
// Automatically disabled when prefers-reduced-motion is set or on mobile.
export function BlockParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  const COLORS = ["#FF5555", "#FF3333", "#CC0000", "#FF7777"]; // Ember colors
  const COUNT  = 24;

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Check viewport (skip on narrow screens)
    if (window.innerWidth < 768) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    type Particle = { x: number; y: number; size: number; speed: number; color: string; opacity: number };
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 4 + 2,        // 2–6 px blocks
      speed: Math.random() * 0.4 + 0.1,   // slow drift up
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: Math.random() * 0.15 + 0.04,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle   = p.color;
        // Add a slight glow effect
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 2;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
        ctx.shadowBlur = 0; // Reset
        
        p.y -= p.speed; // Float UP instead of down
        if (p.y < -p.size) {
          p.y = canvas.height + p.size;
          p.x = Math.random() * canvas.width;
        }
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const cleanup = init();
    return () => {
      cancelAnimationFrame(rafRef.current);
      cleanup?.();
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden
    />
  );
}

/* ── Bottom CTA ("JOIN SERVER") ──────────────────────────────────── */
export function BottomCTA() {
  return (
    <section
      className="relative py-32 px-4 flex flex-col items-center justify-center text-center z-10"
      aria-label="Final registration call to action"
    >
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Icon cluster */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {["⚔", "💎", "🎮"].map((icon) => (
            <span
              key={icon}
              className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full text-xl bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              {icon}
            </span>
          ))}
        </div>

        {/* Heading */}
        <h2
          className="font-pixel text-2xl md:text-4xl text-white mb-6 leading-loose drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          READY TO JOIN THE SERVER?
        </h2>
        <p className="font-sans text-gray-300 text-base md:text-lg mb-3 drop-shadow-md">
          Gather your team. Pick your tools. Ignite the hackathon.
        </p>
        <p className="font-sans text-sm text-gray-500 mb-12">
          Event date: <span className="text-gray-400">January 30, 2026</span>
        </p>

        {/* CTA button (glassmorphic style) */}
        <a
          href={REGISTER_URL /* TODO: replace with real Unstop URL */}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center px-12 py-6 font-pixel text-sm tracking-widest text-white transition-all duration-300"
          aria-label="Register for hack2ignite on Unstop"
          onClick={playClickSound}
        >
          {/* Glowing background */}
          <div className="absolute inset-0 bg-blue-600/80 rounded-lg blur-md group-hover:bg-blue-500 transition-colors duration-300 opacity-70 group-hover:opacity-100"></div>
          {/* Main button body */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg border border-blue-400/50"></div>
          
          <span className="relative z-10 flex items-center gap-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            ▶ &nbsp;JOIN SERVER NOW
          </span>
        </a>

        {/* Sub-note */}
        <p className="font-sans text-xs text-gray-500 mt-8">
          Free to participate · Register via Unstop
        </p>
      </div>
    </section>
  );
}

/* ── Advancement Toast ───────────────────────────────────────────── */
export function AdvancementToast() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 800) {
        if (!visible && !sessionStorage.getItem("advancement_shown")) {
          setVisible(true);
          sessionStorage.setItem("advancement_shown", "true");
          playDingSound();
          timeout = setTimeout(() => setVisible(false), 5000);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed top-24 right-4 z-[9999] bg-[#212121] p-3 flex items-center gap-4 border-2"
          style={{
             boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.2), inset -2px -2px 0 rgba(0,0,0,0.5)',
             width: '300px',
             borderTopColor: '#555555',
             borderLeftColor: '#555555',
             borderBottomColor: '#000000',
             borderRightColor: '#000000',
          }}
        >
          <div className="w-10 h-10 flex-shrink-0 bg-[#0D0D0D] border-2 border-red-900 flex items-center justify-center text-red-500">
            <Icon icon="pixelarticons:trophy" width="24" height="24" />
          </div>
          <div>
            <div className="font-sans font-bold text-[0.65rem] text-[#FFFF55] tracking-widest mb-1 drop-shadow-md">
              Advancement Made!
            </div>
            <div className="font-sans font-bold text-[0.65rem] text-white tracking-widest drop-shadow-md">
              Ready to Ignite
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

