import ReactLenis from "lenis/react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import RulesSection from "./components/RulesSection";
import PrizesSection from "./components/PrizesSection";
import FaqSection from "./components/FaqSection";
import { BottomCTA } from "./components/PolishLayer";

export default function Home() {
  return (
    <>
      <ReactLenis root />
      <Navbar />

      <main id="main-content">
        {/* ── Section 1: Hero (closes issue #1) ── */}
        <HeroSection />

        {/* ── Section 2: Timeline (closes issue #2) ── */}
        <TimelineSection />

        {/* ── Section 3: Rules & Eligibility (closes issue #3) ── */}
        <RulesSection />

        {/* ── Section 4: Prize Pool & Sponsors (closes issue #4) ── */}
        <PrizesSection />

        {/* ── END SECTIONS WRAPPER (FAQ & CTA) ── */}
        <div className="relative w-full">
          {/* Shared Background for FAQ & Bottom CTA */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/all-set-bg.jpg"
              alt="Ready to Join Minecraft Server"
              fill
              className="object-cover object-center opacity-40"
              priority
            />
            {/* Gradient overlays to blend smoothly with previous section and footer */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F15] via-black/40 to-[#0A0202]" />
          </div>

          <div className="relative z-10">
            {/* ── Section 5: FAQ Chat Log ── */}
            <FaqSection />

            {/* ── Section 6: Bottom CTA / "JOIN SERVER" push (closes issue #5) ── */}
            <BottomCTA />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="border-t border-white/10 py-8 px-6 bg-[#0A0202] relative z-20"
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center gap-4">
          <p className="font-sans text-[0.65rem] font-bold text-gray-500 tracking-widest text-center">
            HACK2IGNITE © 2026 — ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </>
  );
}
