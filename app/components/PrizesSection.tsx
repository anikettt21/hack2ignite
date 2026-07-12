"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { playDingSound } from "../utils/sounds";
import { Icon } from '@iconify/react';

/* ── Prize data ──────────────────────────────────────────────────── */
const PRIZES = [
  {
    rank: "1ST PLACE",
    amount: "₹1,25,000",
    rarity: "LEGENDARY",
    rarityColor: "#FDE047", // Flashlight yellow
    borderColor: "#FDE047",
    glowColor: "rgba(253,224,71,0.4)",
    chestImage: "/chests/chest-gold-v2.png",
    desc: "Ultimate Winner Rewards",
  },
  {
    rank: "2ND PLACE",
    amount: "₹75,000",
    rarity: "RARE",
    rarityColor: "#93C5FD", // Misty blue
    borderColor: "#93C5FD",
    glowColor: "rgba(147,197,253,0.3)",
    chestImage: "/chests/chest-cyan-v2.png",
    desc: "Runner-up Distinction",
  },
  {
    rank: "3RD PLACE",
    amount: "₹50,000",
    rarity: "UNCOMMON",
    rarityColor: "#86EFAC", // Swamp green
    borderColor: "#86EFAC",
    glowColor: "rgba(134,239,172,0.3)",
    chestImage: "/chests/chest-green-v2.png",
    desc: "Bronze Tier Achievement",
  },
] as const;

/* ── Sponsor tiers ───────────────────────────────────────────────── */
// Placeholder sponsors for layout visualization
const SPONSOR_TIERS = [
  {
    label: "TITLE SPONSOR",
    sponsors: [
      { name: "DIGITALOCEAN", icon: "logos:digital-ocean" }
    ],
    borderColor: "#FDE047",
    labelColor: "#FDE047",
    height: "h-32",
    textSize: "text-sm md:text-xl",
  },
  {
    label: "GOLD SPONSORS",
    sponsors: [
      { name: "SUPABASE", icon: "logos:supabase-icon" },
      { name: "POSTMAN", icon: "logos:postman-icon" }
    ],
    borderColor: "#FBBF24",
    labelColor: "#FBBF24",
    height: "h-28",
    textSize: "text-xs md:text-base",
  },
  {
    label: "SILVER SPONSORS",
    sponsors: [
      { name: "HASHNODE", icon: "logos:hashnode-icon" },
      { name: "VERCEL", icon: "logos:vercel-icon" },
      { name: "DOCKER", icon: "logos:docker-icon" }
    ],
    borderColor: "#9CA3AF",
    labelColor: "#9CA3AF",
    height: "h-24",
    textSize: "text-[0.6rem] md:text-sm",
  },
  {
    label: "COMMUNITY PARTNERS",
    sponsors: [
      { name: "FIGMA", icon: "logos:figma" },
      { name: "NOTION", icon: "logos:notion-icon" },
      { name: "TAILWIND", icon: "logos:tailwindcss-icon" },
      { name: "REACT", icon: "logos:react" }
    ],
    borderColor: "#EF4444", // Eerie red
    labelColor: "#EF4444",
    height: "h-20",
    textSize: "text-[0.5rem] md:text-xs",
  },
] as const;

/* ── Loot chest image with scroll-triggered glow ─────────────────── */
function LootChest({
  isOpen,
  src,
  alt,
  glowColor,
}: {
  isOpen: boolean;
  src: string;
  alt: string;
  glowColor: string;
}) {
  return (
    <div className="relative mx-auto w-44 h-44 z-10">
      <motion.div
        className="relative w-full h-full"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120, damping: 14 }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={isOpen ? { y: [0, -8, 0] } : { y: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2, // Start float shortly after pop-in
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            style={{ imageRendering: "pixelated" }}
            sizes="176px"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Glow pulse when visible */}
      {isOpen && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.4] }}
          transition={{ delay: 0.3, duration: 1.2, times: [0, 0.4, 1] }}
          style={{
            background: `radial-gradient(ellipse at 50% 70%, ${glowColor} 0%, transparent 70%)`,
            filter: "blur(12px)",
          }}
        />
      )}
    </div>
  );
}

/* ── Individual prize chest card ─────────────────────────────────── */
function PrizeCard({
  prize,
  index,
}: {
  prize: (typeof PRIZES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => playDingSound()}
      className="group relative flex flex-col items-center gap-4 p-6 rounded-xl border backdrop-blur-md cursor-pointer transition-all duration-300"
      style={{
        background: "rgba(17, 24, 39, 0.65)", // Foggy dark bg
        borderColor: "rgba(255, 255, 255, 0.05)",
        boxShadow: inView ? `0 0 40px ${prize.glowColor}` : "none",
      }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      {/* Hover glow outline */}
      <div 
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ border: `1px solid ${prize.borderColor}` }}
      />

      {/* Rank label */}
      <div
        className="relative z-10 font-pixel text-xs tracking-widest px-4 py-2 border rounded-md backdrop-blur-sm"
        style={{ color: prize.rarityColor, borderColor: `${prize.borderColor}40`, background: `${prize.borderColor}10` }}
      >
        {prize.rank}
      </div>

      {/* Loot chest */}
      <LootChest
        isOpen={inView}
        src={prize.chestImage}
        alt={`${prize.rank} loot chest`}
        glowColor={prize.glowColor}
      />

      {/* Rarity badge */}
      <div
        className="relative z-10 font-pixel text-[0.6rem] md:text-xs px-3 py-2 rounded-sm"
        style={{
          background: `${prize.rarityColor}15`,
          border: `1px solid ${prize.rarityColor}50`,
          color: prize.rarityColor,
        }}
      >
        ★ {prize.rarity}
      </div>

      {/* Amount */}
      <div
        className="relative z-10 font-pixel text-2xl tracking-wide"
        style={{
          color: prize.rarityColor,
          textShadow: `0 0 10px ${prize.glowColor}`,
        }}
      >
        {prize.amount}
      </div>

      <p className="relative z-10 font-sans text-xs text-gray-400 text-center">
        {prize.desc}
      </p>
    </motion.div>
  );
}

/* ── Sponsor slot ────────────────────────────────────────────────── */
function SponsorSlot({
  borderColor,
  height,
  textSize,
  sponsor,
}: {
  borderColor: string;
  height: string;
  textSize: string;
  sponsor: { name: string; icon: string };
}) {
  return (
    <div
      className={`flex items-center justify-center ${height} flex-1 rounded-lg border relative overflow-hidden backdrop-blur-sm transition-all duration-300 group hover:bg-white/5 cursor-pointer`}
      style={{
        background: "rgba(17, 24, 39, 0.5)",
        borderColor: "rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
           style={{ boxShadow: `inset 0 0 20px ${borderColor}20` }} />

      {/* Eerie spider eye dots */}
      <div className="absolute top-2 right-2 flex gap-1">
        <div className="w-1 h-1 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,1)] opacity-70" />
        <div className="w-1 h-1 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,1)] opacity-70" />
      </div>

      {/* Sponsor Logo and Name */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-3 group-hover:scale-110 transition-transform duration-300 pointer-events-none p-2 text-center">
        <Icon icon={sponsor.icon} className="text-3xl md:text-5xl drop-shadow-md grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
        <span
          className={`font-pixel ${textSize} tracking-widest text-gray-500 group-hover:text-white transition-colors drop-shadow-md`}
        >
          {sponsor.name}
        </span>
      </div>
    </div>
  );
}

/* ── Sponsor tier row ────────────────────────────────────────────── */
function SponsorTier({
  tier,
  index,
}: {
  tier: (typeof SPONSOR_TIERS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Tier label */}
      <div className="flex items-center gap-3">
        <div
          className="h-[1px] flex-1"
          style={{ background: `linear-gradient(90deg, transparent, ${tier.borderColor}40)` }}
        />
        <span
          className="font-pixel text-[0.6rem] md:text-sm tracking-widest px-4"
          style={{ color: tier.labelColor, textShadow: `0 0 8px ${tier.borderColor}40` }}
        >
          {tier.label}
        </span>
        <div
          className="h-[1px] flex-1"
          style={{ background: `linear-gradient(-90deg, transparent, ${tier.borderColor}40)` }}
        />
      </div>

      {/* Slots */}
      <div className="flex gap-3">
        {tier.sponsors.map((sponsor, i) => (
          <SponsorSlot
            key={i}
            sponsor={sponsor}
            borderColor={tier.borderColor}
            height={tier.height}
            textSize={tier.textSize}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Section separator ───────────────────────────────────────────── */
function BlockSeparator({ color = "#FDE047" }: { color?: string }) {
  return (
    <div className="flex w-full h-[2px] my-16 opacity-30" aria-hidden>
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-full mx-1"
          style={{ background: color, filter: "blur(1px)" }}
        />
      ))}
    </div>
  );
}

/* ── Section wrapper ─────────────────────────────────────────────── */
export default function PrizesSection() {
  const prizeHeaderRef = useRef<HTMLDivElement>(null);
  const sponsorHeaderRef = useRef<HTMLDivElement>(null);
  const prizeHeaderInView = useInView(prizeHeaderRef, { once: true });
  const sponsorHeaderInView = useInView(sponsorHeaderRef, { once: true });

  return (
    <section
      className="relative py-24 px-4 overflow-hidden bg-[#0A0F15]"
      aria-label="Prize pool and sponsors section"
    >
      {/* Spooky Fog Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/spooky-forest-bg.jpg"
          alt="Spooky Foggy Forest"
          fill
          className="object-cover opacity-25 object-bottom"
          priority
        />
        {/* Fog Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F15] via-transparent to-[#0A0F15]" />
        <div className="absolute inset-0 bg-[#0A0F15]/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">

        {/* ── PRIZE POOL ── */}
        <div id="prizes">
          <motion.div
            ref={prizeHeaderRef}
            className="mb-16 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={prizeHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block border border-yellow-400/30 bg-yellow-400/10 backdrop-blur-md rounded-md px-3 py-1 mb-6">
              <span className="font-sans text-xs font-bold text-yellow-300 tracking-widest drop-shadow-[0_0_5px_rgba(253,224,71,0.5)]">
                CHAPTER 04A
              </span>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <Icon icon="pixelarticons:gift" className="text-yellow-400 text-4xl drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]" />
              <h2
                className="font-pixel text-4xl md:text-5xl text-yellow-400"
                style={{ textShadow: "0 0 15px rgba(253,224,71,0.4)" }}
              >
                PRIZE POOL
              </h2>
            </div>
            <p className="font-sans text-gray-400 text-sm md:text-base max-w-lg">
              Legendary loot awaits the top crafters in the fog. Open the chests to
              reveal your rewards.{" "}
              <span className="text-gray-500 text-xs block mt-1">Total Prize Pool: ₹2,50,000</span>
            </p>
          </motion.div>

          {/* Chest cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PRIZES.map((prize, i) => (
              <PrizeCard key={prize.rank} prize={prize} index={i} />
            ))}
          </div>
        </div>

        {/* Separator */}
        <BlockSeparator color="#FDE047" />

        {/* ── SPONSORS ── */}
        <div id="sponsors">
          <motion.div
            ref={sponsorHeaderRef}
            className="mb-12 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={sponsorHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block border border-red-500/30 bg-red-500/10 backdrop-blur-md rounded-md px-3 py-1 mb-6">
              <span className="font-sans text-xs font-bold text-red-400 tracking-widest drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
                CHAPTER 04B
              </span>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <Icon icon="pixelarticons:diamond" className="text-red-500 text-4xl drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              <h2
                className="font-pixel text-4xl md:text-5xl text-red-500"
                style={{ textShadow: "0 0 15px rgba(239,68,68,0.4)" }}
              >
                SPONSORS
              </h2>
            </div>
            <p className="font-sans text-gray-400 text-sm md:text-base max-w-lg">
              The guilds that make this world possible. Follow the glowing eyes in the dark. Interested in
              sponsoring?{" "}
              <a href="mailto:hack2Ignite@gmail.com" className="text-yellow-400 hover:text-yellow-300 underline cursor-pointer transition-colors">
                Contact hack2Ignite@gmail.com
              </a>
            </p>
          </motion.div>

          {/* Tier hierarchy */}
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {SPONSOR_TIERS.map((tier, i) => (
              <SponsorTier key={tier.label} tier={tier} index={i} />
            ))}
          </div>

          {/* Sponsor disclaimer */}
          <p className="font-sans text-xs text-gray-600 text-center mt-12">
            {/* TODO: Update when sponsors are confirmed */}
            Sponsor slots are open. All logos will be updated when confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}
