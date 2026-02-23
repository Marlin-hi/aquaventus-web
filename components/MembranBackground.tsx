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
      {/* Mesh gradient orbs — light mode (color base) */}
      <div className="mesh-orb mesh-orb-1" />
      <div className="mesh-orb mesh-orb-2" />
      <div className="mesh-orb mesh-orb-3" />
      <div className="mesh-orb mesh-orb-4" />
      <div className="mesh-orb mesh-orb-5" />

      {/* Noise grain overlay — light mode */}
      <svg className="noise-overlay" aria-hidden="true">
        <filter id="noise-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>

      {/* Topografie contour lines — light mode */}
      <svg className="topo-lines" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {/* Cluster 1 — links oben */}
        <path d="M180,220 C220,140 340,100 420,150 C500,200 480,300 400,340 C320,380 200,340 180,260Z" />
        <path d="M210,225 C240,160 330,125 395,165 C460,205 445,285 380,315 C315,345 225,315 210,265Z" />
        <path d="M240,230 C260,180 325,155 370,180 C420,210 410,268 365,290 C315,312 250,292 240,260Z" />
        <path d="M268,238 C280,200 320,185 350,200 C380,215 375,252 350,266 C325,280 275,270 268,252Z" />
        {/* Cluster 2 — rechts oben */}
        <path d="M900,120 C960,60 1100,50 1180,110 C1260,170 1230,280 1140,320 C1050,360 920,310 900,200Z" />
        <path d="M930,135 C980,85 1080,78 1148,125 C1216,172 1195,260 1120,292 C1045,324 940,285 930,195Z" />
        <path d="M958,152 C995,112 1065,106 1118,142 C1172,178 1158,242 1100,266 C1042,290 968,260 958,195Z" />
        <path d="M985,170 C1010,140 1050,135 1088,160 C1126,185 1118,225 1082,242 C1046,258 995,238 985,200Z" />
        {/* Cluster 3 — mitte unten */}
        <path d="M500,550 C560,480 720,440 820,510 C920,580 890,700 790,750 C690,800 520,740 500,630Z" />
        <path d="M535,560 C585,502 700,470 785,525 C870,580 845,678 762,718 C680,758 548,708 535,622Z" />
        <path d="M568,572 C608,525 690,500 755,542 C820,584 800,658 738,690 C676,722 578,682 568,618Z" />
        <path d="M600,586 C630,550 680,535 725,562 C770,590 758,638 718,660 C678,682 608,656 600,618Z" />
        {/* Cluster 4 — links unten */}
        <path d="M60,650 C100,580 220,540 300,600 C380,660 360,770 280,810 C200,850 80,800 60,720Z" />
        <path d="M90,660 C120,604 218,572 280,618 C342,664 326,748 262,782 C198,816 102,778 90,712Z" />
        <path d="M118,672 C142,628 218,604 265,638 C312,672 300,730 252,758 C204,786 128,756 118,708Z" />
        {/* Cluster 5 — rechts unten */}
        <path d="M1050,600 C1100,530 1240,510 1320,570 C1400,630 1370,740 1280,780 C1190,820 1070,770 1050,670Z" />
        <path d="M1080,615 C1120,558 1222,542 1290,590 C1358,638 1335,724 1260,758 C1185,792 1095,750 1080,668Z" />
        <path d="M1108,632 C1140,588 1210,575 1260,612 C1310,650 1295,712 1240,738 C1185,764 1118,732 1108,672Z" />
      </svg>

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
