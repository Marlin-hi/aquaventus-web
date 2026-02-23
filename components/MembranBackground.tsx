"use client";

import { useEffect, useRef } from "react";

export default function MembranBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    const el = ref.current;
    if (!el) return;
    const panels = el.querySelectorAll<HTMLElement>("[data-speed]");

    function update() {
      const offset = window.scrollY;
      panels.forEach((panel) => {
        const speed = parseFloat(panel.dataset.speed || "0");
        panel.style.transform = `translateY(${-offset * speed}px)`;
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div ref={ref} className="membran-bg" aria-hidden="true">
      {/* Mesh gradient orbs — light mode */}
      <div className="mesh-orb mesh-orb-1" />
      <div className="mesh-orb mesh-orb-2" />
      <div className="mesh-orb mesh-orb-3" />
      <div className="mesh-orb mesh-orb-4" />
      <div className="mesh-orb mesh-orb-5" />

      {/* Far: translucent wall panels — dark mode */}
      <div className="mp mp-far mp-f1" data-speed="0.12" />
      <div className="mp mp-far mp-f3" data-speed="0.12" />
      <div className="mp mp-far mp-f4" data-speed="0.12" />

      {/* Mid: visible frosted walls */}
      <div className="mp mp-mid mp-m1" data-speed="0.30" />
      <div className="mp mp-mid mp-m3" data-speed="0.30" />

      {/* Near: sharp foreground panels */}
      <div className="mp mp-near mp-n1" data-speed="0.50" />
      <div className="mp mp-near mp-n3" data-speed="0.50" />
      <div className="mp mp-near mp-n5" data-speed="0.50" />
      <div className="mp mp-near mp-n8" data-speed="0.50" />

      {/* Glow kern-lines */}
      <div className="mp-glow mp-g1" data-speed="0.50" />
      <div className="mp-glow mp-g4" data-speed="0.50" />
    </div>
  );
}
