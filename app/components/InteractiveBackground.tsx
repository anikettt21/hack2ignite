"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const blockSize = 64;
    let cols = Math.ceil(width / blockSize);
    let rows = Math.ceil(height / blockSize);
    
    // Store glow intensity for each block
    let glowGrid: number[][] = Array(cols).fill(0).map(() => Array(rows).fill(0));

    let mouse = { x: -1000, y: -1000 };
    let isMoving = false;

    // Particles array
    const particles: { x: number; y: number; vx: number; vy: number; life: number; size: number; color: string }[] = [];
    const colors = ["#FF0000", "#CC0000", "#FF5555", "#AA0000"];

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMoving = true;
      
      const col = Math.floor(mouse.x / blockSize);
      const row = Math.floor(mouse.y / blockSize);
      
      if (col >= 0 && col < cols && row >= 0 && row < rows) {
        glowGrid[col][row] = 1.0;
        
        // Glow neighbors slightly
        if (col > 0) glowGrid[col-1][row] = Math.max(glowGrid[col-1][row], 0.4);
        if (col < cols-1) glowGrid[col+1][row] = Math.max(glowGrid[col+1][row], 0.4);
        if (row > 0) glowGrid[col][row-1] = Math.max(glowGrid[col][row-1], 0.4);
        if (row < rows-1) glowGrid[col][row+1] = Math.max(glowGrid[col][row+1], 0.4);
      }

      // Add redstone particles
      if (Math.random() > 0.3) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 20,
          y: mouse.y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1,
          vy: Math.random() * 1 + 0.5, // drift downwards like dust
          life: 1.0,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      const newCols = Math.ceil(width / blockSize);
      const newRows = Math.ceil(height / blockSize);
      const newGrid = Array(newCols).fill(0).map(() => Array(newRows).fill(0));
      for (let c = 0; c < Math.min(cols, newCols); c++) {
        for (let r = 0; r < Math.min(rows, newRows); r++) {
          newGrid[c][r] = glowGrid[c][r];
        }
      }
      glowGrid = newGrid;
      cols = newCols;
      rows = newRows;
    };
    window.addEventListener("resize", onResize);

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Grid Glow
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          if (glowGrid[c][r] > 0) {
            // Block fill glow
            ctx.fillStyle = `rgba(255, 0, 0, ${glowGrid[c][r] * 0.15})`;
            ctx.fillRect(c * blockSize, r * blockSize, blockSize, blockSize);
            
            // Block border highlight
            ctx.strokeStyle = `rgba(255, 85, 85, ${glowGrid[c][r] * 0.3})`;
            ctx.lineWidth = 2;
            ctx.strokeRect(c * blockSize + 2, r * blockSize + 2, blockSize - 4, blockSize - 4);

            glowGrid[c][r] -= 0.015; // Fade out speed
            if (glowGrid[c][r] < 0) glowGrid[c][r] = 0;
          }
        }
      }

      // Update and draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        
        // Neon glow effect for particles
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      
      // Reset context states
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      requestAnimationFrame(update);
    };

    const animId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[0]"
      style={{ imageRendering: "pixelated" }}
      aria-hidden
    />
  );
}
