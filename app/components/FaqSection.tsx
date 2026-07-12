"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { playClickSound } from "../utils/sounds";
import { Icon } from '@iconify/react';

const FAQ_DATA = [
  { player: "NoobMaster69", question: "Is this hackathon free?", serverReply: "Yes, hack2ignite is 100% free to attend!" },
  { player: "DiamondMiner", question: "Can I join without a team?", serverReply: "You need a team of 2-4 members to participate." },
  { player: "RedstoneGenius", question: "Will food be provided?", serverReply: "Steak, golden apples, and energy drinks are on us!" },
  { player: "CreeprAwwMan", question: "What should I bring?", serverReply: "Bring your laptop, charger, student ID, and your diamond pickaxe." },
  { player: "Steve", question: "Can we use pre-existing code?", serverReply: "No, all code must be written during the event." },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4 relative z-10" aria-label="FAQ Section">
      <div className="max-w-[900px] mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block border border-blue-400/30 bg-blue-400/10 backdrop-blur-md rounded-md px-3 py-1 mb-6 shadow-[0_0_15px_rgba(96,165,250,0.15)]">
            <span className="font-sans text-xs font-bold text-blue-400 tracking-widest drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]">
              CHAPTER 05
            </span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <Icon icon="pixelarticons:message" className="text-blue-400 text-4xl drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
            <h2 className="font-pixel text-4xl md:text-5xl text-blue-400" style={{ textShadow: "0 0 15px rgba(96,165,250,0.4)" }}>
              FAQ (CHAT LOG)
            </h2>
          </div>

          <p className="font-sans text-gray-400 text-sm md:text-base max-w-lg mb-12 drop-shadow-md">
            Got questions? Check the server chat log. Click on a message to read the server's reply.
          </p>
        </div>

        {/* Glassmorphic Chat Box */}
        <div 
          className="bg-[#050505]/60 backdrop-blur-xl border border-white/10 p-5 md:p-8 flex flex-col rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
          style={{ minHeight: '400px' }}
        >
          
          <div className="flex flex-col gap-4 flex-1 mb-6 overflow-y-auto pr-2 custom-scrollbar">
            <div className="font-sans text-sm md:text-base text-yellow-300 drop-shadow-[0_0_5px_rgba(253,224,71,0.5)] mb-6 pb-4 border-b border-white/5">
              Welcome to the hack2ignite server! Type /help for a list of commands.
            </div>

            {FAQ_DATA.map((faq, i) => (
              <div key={i} className="flex flex-col gap-2 cursor-pointer group" onClick={() => {
                setOpenIndex(openIndex === i ? null : i);
                playClickSound();
              }}>
                {/* Question */}
                <div className="font-sans text-sm md:text-base text-gray-300 group-hover:text-white transition-colors drop-shadow-md flex items-start gap-2">
                  <span className="text-gray-500 mt-1">&gt;</span>
                  <div>
                    <span className="text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">&lt;{faq.player}&gt; </span>
                    {faq.question}
                  </div>
                </div>
                {/* Answer */}
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: openIndex === i ? 1 : 0, height: openIndex === i ? 'auto' : 0 }} 
                  className="overflow-hidden"
                >
                  <div className="font-sans text-sm md:text-base text-gray-200 drop-shadow-md pl-6 border-l-2 border-blue-500/50 ml-[5px] my-2 py-1 bg-white/5 rounded-r-md">
                    <span className="text-red-400 font-bold">[Server]</span> {faq.serverReply}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Chat input box at bottom */}
          <div className="mt-auto flex items-center bg-black/50 border border-white/10 rounded-lg px-4 py-3 shadow-inner">
            <span className="text-blue-400 mr-3 font-pixel text-xs">&gt;</span>
            <input 
              type="text" 
              className="bg-transparent border-none outline-none text-white font-sans text-sm w-full placeholder-gray-600" 
              placeholder="Click a question above to see the answer..." 
              disabled 
            />
            <div className="w-2 h-4 bg-gray-400 animate-pulse rounded-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
