"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stars: Star[] = [];
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 3,
      });
    }

    container.innerHTML = "";

    stars.forEach((star) => {
      const starEl = document.createElement("div");
      starEl.className = "star";
      starEl.style.cssText = `
        left: ${star.x}%;
        top: ${star.y}%;
        width: ${star.size}px;
        height: ${star.size}px;
        --duration: ${star.duration}s;
        --delay: ${star.delay}s;
      `;
      container.appendChild(starEl);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    />
  );
}
