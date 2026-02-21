"use client";

import { useEffect, useRef } from "react";

export default function MembranBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    let idleTimer: ReturnType<typeof setTimeout>;
    const el = ref.current;
    if (!el) return;
    const panels = el.querySelectorAll<HTMLElement>("[data-speed]");

    function update() {
      const offset = window.scrollY;
      panels.forEach((panel) => {
        panel.style.willChange = "transform";
        const speed = parseFloat(panel.dataset.speed || "0");
        panel.style.transform = `translateY(${-offset * speed}px)`;
      });
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        panels.forEach((p) => { p.style.willChange = "auto"; });
      }, 150);
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
      {/* Ultra-far: deep background wash */}
      <div className="mp mp-ultra-far mp-uf1" data-speed="0.08" />
      <div className="mp mp-ultra-far mp-uf2" data-speed="0.08" />
      <div className="mp mp-ultra-far mp-uf3" data-speed="0.08" />

      {/* Far: translucent wall panels */}
      <div className="mp mp-far mp-f1" data-speed="0.15" />
      <div className="mp mp-far mp-f2" data-speed="0.15" />
      <div className="mp mp-far mp-f3" data-speed="0.15" />
      <div className="mp mp-far mp-f4" data-speed="0.15" />
      <div className="mp mp-far mp-f5" data-speed="0.15" />
      <div className="mp mp-far mp-f6" data-speed="0.15" />

      {/* Mid: visible frosted walls */}
      <div className="mp mp-mid mp-m1" data-speed="0.35" />
      <div className="mp mp-mid mp-m2" data-speed="0.35" />
      <div className="mp mp-mid mp-m3" data-speed="0.35" />
      <div className="mp mp-mid mp-m4" data-speed="0.35" />
      <div className="mp mp-mid mp-m5" data-speed="0.35" />

      {/* Near: sharp foreground panels */}
      <div className="mp mp-near mp-n1" data-speed="0.60" />
      <div className="mp mp-near mp-n2" data-speed="0.60" />
      <div className="mp mp-near mp-n3" data-speed="0.60" />
      <div className="mp mp-near mp-n4" data-speed="0.60" />

      {/* Glow kern-lines */}
      <div className="mp-glow mp-g1" data-speed="0.60" />
      <div className="mp-glow mp-g2" data-speed="0.60" />
      <div className="mp-glow mp-g3" data-speed="0.60" />
    </div>
  );
}
