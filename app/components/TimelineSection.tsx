"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "motion/react";
import { Icon } from '@iconify/react';

/* ── Milestone data ──────────────────────────────────────────────── */
const MILESTONES = [
  { id: 1, label: "Registrations Open",   icon: "pixelarticons:script", date: "Nov 15, 2025 — 12:00 AM IST", desc: "Secure your spot in the arena. Gather your party.", phase: "PHASE 1", highlight: false },
  { id: 2, label: "Registrations Close",  icon: "pixelarticons:lock", date: "Dec 31, 2025 — 11:59 PM IST", desc: "The gates lock. No more entries allowed.", phase: "PHASE 2", highlight: false },
  { id: 3, label: "Shortlisted Teams",    icon: "pixelarticons:users", date: "Jan 8, 2026", desc: "Announcement of the shortlisted teams who will enter the arena.", phase: "PHASE 3", highlight: false },
  { id: 4, label: "Hackathon Begins",     icon: "pixelarticons:zap", date: "Jan 30, 2026", desc: "The ultimate showdown starts. Begin crafting your projects!", phase: "PHASE 4", highlight: true },
  { id: 5, label: "Result Announced",     icon: "pixelarticons:trophy", date: "Jan 31, 2026", desc: "The champions are crowned. Claim your legendary loot!", phase: "PHASE 5", highlight: true },
] as const;

/* ── Individual Timeline Card ─────────────────────────────────────── */
function TimelineCard({
  milestone,
  index,
}: {
  milestone: (typeof MILESTONES)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <div className="relative w-full flex justify-end md:justify-center items-center mb-16 md:mb-24 last:mb-0">
      
      {/* Center Node (Icon) */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 border-2 z-20 flex items-center justify-center bg-[#020B14] ${
          milestone.highlight 
            ? "border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] text-white" 
            : "border-cyan-900 text-cyan-400"
        }`}
      >
        <Icon icon={milestone.icon} width="20" height="20" />
      </motion.div>

      {/* Horizontal connector line (Desktop only) */}
      <motion.div 
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-cyan-900/50 z-10 w-[calc(50%-2rem)] ${
          isLeft ? "right-1/2" : "left-1/2"
        }`}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ transformOrigin: isLeft ? "right" : "left" }}
      />

      {/* Glassmorphic Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className={`w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] z-20 ${
          isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
        }`}
      >
        <div className={`
          p-6 rounded-xl border backdrop-blur-xl group relative overflow-hidden transition-all duration-300
          ${milestone.highlight 
            ? 'border-cyan-400/50 bg-cyan-900/20 shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]' 
            : 'border-white/10 bg-black/60 hover:bg-black/80 hover:border-cyan-400/50 shadow-xl'
          }
        `}>
          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col gap-2">
            <span className="font-sans text-[0.65rem] font-bold text-cyan-400 tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 inline-block bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
              {milestone.phase}
            </span>
            
            <h3 className={`font-pixel text-lg md:text-xl mt-1 ${
              milestone.highlight ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-gray-200'
            }`}>
              {milestone.label}
            </h3>
            
            <p className="font-sans text-sm text-gray-400 mt-2 leading-relaxed">
              {milestone.desc}
            </p>
            
            <div className="font-sans text-xs font-bold text-gray-300 mt-4 bg-white/5 inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-md border border-white/10">
              <Icon icon="pixelarticons:clock" />
              {milestone.date}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Section wrapper ─────────────────────────────────────────────── */
export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth out the progress bar
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section
      id="timeline"
      className="relative w-full py-32 overflow-hidden bg-[#020B14]"
      aria-label="Timeline section"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 scale-105"
      >
        <source src="/minecraft-underwater-bg.mp4" type="video/mp4" />
      </video>

      {/* Oceanic Overlays for depth and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020B14] via-[#020B14]/60 to-[#020B14] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Section header */}
        <div className="text-center mb-24 flex flex-col items-center">
          <div className="inline-flex items-center gap-3 border-2 border-cyan-900 bg-cyan-900/20 px-4 py-2 mb-6 backdrop-blur-md">
            <Icon icon="pixelarticons:hourglass" className="text-cyan-400 text-xl" />
            <span className="font-sans text-xs font-bold text-cyan-300 tracking-[0.2em]">
              CHAPTER 02
            </span>
          </div>

          <h2 className="font-pixel text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            style={{ textShadow: "4px 4px 0 #083344" }}>
            TIMELINE
          </h2>
          <p className="font-sans text-gray-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
             style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
            Track the evolution of the hackathon from registration to the final winner announcement. Dive deep into the schedule.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative w-full max-w-5xl mx-auto pb-12">
          
          {/* Background Track Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-cyan-900/30 -translate-x-1/2 z-0" />
          
          {/* Animated Water Current Progress Line */}
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 via-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.8)] -translate-x-1/2 z-10"
            style={{ scaleY, transformOrigin: "top" }}
          />

          {/* Render Timeline Cards */}
          <div className="relative z-20 flex flex-col">
            {MILESTONES.map((m, i) => (
              <TimelineCard key={m.id} milestone={m} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
