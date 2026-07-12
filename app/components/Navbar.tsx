"use client";

import { useState, useEffect } from "react";
import { playClickSound } from "../utils/sounds";
import { Icon } from '@iconify/react';

const NAV_LINKS = [
  { label: "Home",     href: "#hero",     icon: <Icon icon="pixelarticons:home" /> },
  { label: "Timeline", href: "#timeline", icon: <Icon icon="pixelarticons:clock" /> },
  { label: "Rules",    href: "#rules",    icon: <Icon icon="pixelarticons:book-open" /> },
  { label: "Prizes",   href: "#prizes",   icon: <Icon icon="pixelarticons:gift" /> },
  { label: "Sponsors", href: "#sponsors", icon: <Icon icon="pixelarticons:heart" /> },
  { label: "FAQ",      href: "#faq",      icon: <Icon icon="pixelarticons:message" /> },
] as const;

/* TODO: Replace with real registration URL */
const REGISTER_URL = "https://unstop.com";

export default function Navbar() {
  const [activeHash, setActiveHash] = useState("#hero");

  // Keep track of active section for the hotbar selection
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let current = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 300) {
          current = "#" + section;
        }
      }
      if (current) {
        setActiveHash(current);
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed bottom-6 inset-x-0 z-50 flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Active Item Label (Minecraft style above hotbar) */}
      <div className="mb-2 font-sans font-bold text-xs text-white drop-shadow-md tracking-widest pointer-events-auto transition-all">
        {NAV_LINKS.find(link => link.href === activeHash)?.label || "Join Server"}
      </div>

      {/* The Hotbar Container */}
      <div 
        className="flex bg-[#8B8B8B] p-[2px] pointer-events-auto" 
        style={{ 
          border: '2px solid #000',
          boxShadow: '0 4px 0 rgba(0,0,0,0.5)'
        }}
      >
        {NAV_LINKS.map((link, index) => {
          const isActive = activeHash === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setActiveHash(link.href);
                playClickSound();
              }}
              className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-[#8B8B8B] hover:bg-[#A0A0A0] transition-colors group"
              aria-label={link.label}
              style={{
                borderTop: '2px solid #373737',
                borderLeft: '2px solid #373737',
                borderBottom: '2px solid #FFFFFF',
                borderRight: '2px solid #FFFFFF',
              }}
            >
              {/* Selection Box overlay */}
              {isActive && (
                <div className="absolute inset-[-2px] border-[3px] border-white pointer-events-none z-10 box-content">
                   <div className="absolute inset-[-3px] border-[1px] border-black pointer-events-none box-content"></div>
                </div>
              )}
              {/* Icon */}
              <span className={`text-xl md:text-2xl ${isActive ? 'scale-110' : 'scale-100'} group-hover:scale-110 transition-transform duration-200 mc-text-shadow`}>
                {link.icon}
              </span>
              {/* Hotbar Slot Number */}
              <span className="absolute bottom-[2px] right-[4px] font-sans font-bold text-[0.55rem] text-white drop-shadow-md">
                {index + 1}
              </span>
            </a>
          );
        })}

        {/* Register Button as a wider slot */}
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-[4.5rem] md:w-24 h-12 md:h-14 flex items-center justify-center bg-[#CC0000] hover:bg-[#FF3333] transition-colors group ml-1"
          style={{
            borderTop: '2px solid #660000',
            borderLeft: '2px solid #660000',
            borderBottom: '2px solid #FF7777',
            borderRight: '2px solid #FF7777',
          }}
          title="Register Now"
          onClick={playClickSound}
        >
          <span className="font-sans font-bold text-[0.65rem] md:text-xs text-white drop-shadow-md tracking-widest group-hover:scale-105 transition-transform duration-200">
            REGISTER
          </span>
        </a>
      </div>
    </nav>
  );
}
