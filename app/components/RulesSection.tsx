"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Icon } from '@iconify/react';

/* ── Rule card data ──────────────────────────────────────────────── */
// TODO: Replace all placeholder content with finalized rules
const RULES = [
  {
    id: 1,
    num: "01/05",
    icon: <Icon icon="pixelarticons:sword" width="24" height="24" />,
    title: "TEAM SIZE",
    body: "2 to 4 members per team. Solo entries are not accepted. Each member must be enrolled at a recognized institution.",
    todo: "TODO: confirm min/max team limits with organizers.",
  },
  {
    id: 4,
    num: "04/05",
    icon: <Icon icon="pixelarticons:box" width="24" height="24" />,
    title: "CODE OWNERSHIP",
    body: "All code must be written during the event window. Pre-existing projects, forks of prior work, and template repos are strictly prohibited.",
    todo: "TODO: finalize ownership & IP policy with legal.",
  },
  {
    id: 5,
    num: "05/05",
    icon: <Icon icon="pixelarticons:eye" width="24" height="24" />,
    title: "AI USAGE POLICY",
    body: "AI-assisted tools (Copilot, ChatGPT, etc.) are permitted with full disclosure. All generated code must be understood and explainable by the team.",
    todo: "TODO: write full AI disclosure policy document.",
  },
] as const;

/* ── Rule card ───────────────────────────────────────────────────── */
function RuleCard({
  rule,
  index,
}: {
  rule: (typeof RULES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`group relative flex flex-col gap-3 p-6 rounded-xl border backdrop-blur-md transition-all duration-300
        border-white/10 bg-[#0B1021]/60 hover:bg-[#0B1021]/80 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]
      `}
      style={{ margin: "6px" }}
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />

      {/* Top row: icon + card number */}
      <div className="relative z-10 flex items-start justify-between">
        <span
          className="text-2xl w-10 h-10 flex items-center justify-center border-2 border-amber-900 bg-amber-900/20 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
          aria-hidden
        >
          {rule.icon}
        </span>
        <span className="font-sans text-[0.65rem] font-bold text-amber-400 tracking-widest bg-amber-900/30 px-2 py-1 border border-amber-500/30">
          {rule.num}
        </span>
      </div>

      {/* Title */}
      <h3
        className="relative z-10 font-pixel text-[0.7rem] md:text-sm mt-2 text-white"
        style={{ textShadow: "0 0 8px rgba(255,255,255,0.4)" }}
      >
        {rule.title}
      </h3>

      {/* Body */}
      <p className="relative z-10 font-sans text-sm text-gray-300 leading-relaxed flex-1 mt-1">
        {rule.body}
      </p>

      {/* TODO tag */}
      <div className="relative z-10 border-l-2 border-amber-600 pl-2 mt-4">
        <p className="font-sans text-xs text-amber-500/80 italic">{rule.todo}</p>
      </div>
    </motion.div>
  );
}

/* ── Empty slot (6th cell in 3×2 grid) ──────────────────────────── */
function EmptySlot() {
  return (
    <div
      className="hidden md:flex flex-col items-center justify-center p-6 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm"
      style={{
        margin: "6px",
        minHeight: 240,
      }}
      aria-hidden
    >
      <div className="text-center opacity-40">
        <Icon icon="pixelarticons:lock" className="w-8 h-8 text-gray-500 mx-auto mb-3" />
        <div className="font-sans text-[0.65rem] font-bold text-gray-400 tracking-widest">
          SLOT RESERVED
        </div>
        <div className="font-sans text-[0.6rem] font-bold text-gray-500 mt-2">
          [COMING SOON]
        </div>
        {/* Dotted crafting-table pattern */}
        <div className="mt-4 grid grid-cols-3 gap-1 mx-auto w-fit opacity-50">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 border border-gray-600/50"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Grass block divider (Night Mode) ────────────────────────────── */
function NightGrassDivider() {
  return (
    <div className="flex w-full h-3 overflow-hidden" aria-hidden>
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-full"
          style={{
            background: i % 2 === 0 ? "#0d2b12" : "#143a1a",
          }}
        />
      ))}
    </div>
  );
}

/* ── Section wrapper ─────────────────────────────────────────────── */
export default function RulesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="rules"
      className="relative w-full py-32 overflow-hidden bg-[#0A0F1D]"
      aria-label="Rules and eligibility section"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 scale-105"
      >
        <source src="/minecraft-campfire-bg.mp4" type="video/mp4" />
      </video>

      {/* Deep Night & Campfire Glow Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1D] via-[#0A0F1D]/60 to-[#0A0F1D] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Section header */}
        <motion.div
          ref={headerRef}
          className="mb-16 flex flex-col items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 border-2 border-amber-900 bg-amber-900/20 px-4 py-2 mb-6 backdrop-blur-md">
            <Icon icon="pixelarticons:book-open" className="text-amber-500 text-xl" />
            <span className="font-sans text-xs font-bold text-amber-300 tracking-[0.2em]">
              CHAPTER 03
            </span>
          </div>

          <h2
            className="font-pixel text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            style={{ textShadow: "4px 4px 0 #78350F" }}
          >
            RULES
          </h2>
          <p className="font-sans text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed"
             style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
            Read carefully before you craft your entry. Gather around the fire, listen closely, and ensure every voxel counts in the grand design.
          </p>
        </motion.div>

        {/* 3×2 inventory grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {RULES.map((rule, i) => (
            <RuleCard key={rule.id} rule={rule} index={i} />
          ))}
          <EmptySlot />
        </div>

        {/* "Build the future" motivational strip */}
        <motion.div
          className="mt-16 rounded-xl border border-amber-500/30 p-8 text-center relative overflow-hidden backdrop-blur-md"
          style={{ background: "rgba(11, 16, 33, 0.7)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtle glowing sparks texture */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden
            style={{
              backgroundImage: "radial-gradient(circle, rgba(245,158,11,0.15) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <p className="font-pixel text-amber-500 text-lg md:text-xl relative z-10"
            style={{ textShadow: "2px 2px 0 #78350F" }}>
            BUILD THE FUTURE
          </p>
          <p className="font-pixel text-amber-200 text-[0.55rem] tracking-widest mt-3 relative z-10">
            ONE BLOCK AT A TIME
          </p>
        </motion.div>

        {/* Night Grass divider */}
        <div className="mt-16 rounded-xl overflow-hidden border border-white/5">
          <NightGrassDivider />
          <div className="px-4 py-4 bg-[#050811]">
            {/* TODO: Update the date when rules are finalized */}
            <p className="font-sans text-xs text-gray-500 text-center">
              Rules subject to change.&nbsp;
              <span className="text-gray-400">
                Last updated: <span className="text-gray-300">TODO — fill in date</span>
              </span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
