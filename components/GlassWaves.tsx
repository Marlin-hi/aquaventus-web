"use client";

import { useEffect, useRef, useCallback } from "react";

const WAVE_SPEEDS = [0.08, 0.12, 0.06, 0.10];
const SHARP_SPEEDS = [0.15, 0.18, 0.13];
const SHARP_ROTATIONS = [-4, 3, -2];

export default function GlassWaves() {
  const wavesRef = useRef<(HTMLDivElement | null)[]>([]);
  const sharpsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const y = window.scrollY;
      for (let i = 0; i < wavesRef.current.length; i++) {
        const el = wavesRef.current[i];
        if (el) el.style.translate = `0 ${y * WAVE_SPEEDS[i]}px`;
      }
      for (let i = 0; i < sharpsRef.current.length; i++) {
        const el = sharpsRef.current[i];
        if (el) el.style.translate = `0 ${y * SHARP_SPEEDS[i]}px`;
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return (
    <div className="glass-waves" aria-hidden="true">
      {/* === Soft glow layers (background atmosphere) === */}

      {/* Glow 1 — large primary sweep, top-left */}
      <div
        ref={(el) => { wavesRef.current[0] = el; }}
        className="glass-wave glass-wave-1"
        style={{
          width: "120vw",
          height: "40vh",
          top: "-8%",
          left: "-10%",
          "--wave-br": "40% 60% 55% 45% / 50% 40% 60% 50%",
          "--wave-blur": "60px",
        } as React.CSSProperties}
      />
      {/* Glow 2 — accent diagonal, mid-right */}
      <div
        ref={(el) => { wavesRef.current[1] = el; }}
        className="glass-wave glass-wave-2"
        style={{
          width: "100vw",
          height: "30vh",
          top: "32%",
          right: "-15%",
          "--wave-br": "55% 45% 50% 50% / 45% 55% 40% 60%",
          "--wave-blur": "70px",
        } as React.CSSProperties}
      />
      {/* Glow 3 — blended hues, bottom-left */}
      <div
        ref={(el) => { wavesRef.current[2] = el; }}
        className="glass-wave glass-wave-3"
        style={{
          width: "90vw",
          height: "25vh",
          bottom: "5%",
          left: "-5%",
          "--wave-br": "50% 50% 45% 55% / 60% 40% 55% 45%",
          "--wave-blur": "50px",
        } as React.CSSProperties}
      />
      {/* Glow 4 — deep subtle, center */}
      <div
        ref={(el) => { wavesRef.current[3] = el; }}
        className="glass-wave glass-wave-4"
        style={{
          width: "80vw",
          height: "20vh",
          top: "58%",
          left: "10%",
          "--wave-br": "45% 55% 60% 40% / 55% 45% 50% 50%",
          "--wave-blur": "80px",
        } as React.CSSProperties}
      />

      {/* === Sharp glass panes (hard edges, depth) === */}

      {/* Sharp 1 — wide ribbon cutting diagonally across top */}
      <div
        ref={(el) => { sharpsRef.current[0] = el; }}
        className="glass-sharp glass-sharp-1"
        style={{
          width: "130vw",
          height: "18vh",
          top: "12%",
          left: "-15%",
          "--sharp-br": "2% 45% 3% 50% / 40% 2% 45% 3%",
          transform: "rotate(-4deg)",
        } as React.CSSProperties}
      />
      {/* Sharp 2 — mid-page glass sheet */}
      <div
        ref={(el) => { sharpsRef.current[1] = el; }}
        className="glass-sharp glass-sharp-2"
        style={{
          width: "110vw",
          height: "14vh",
          top: "45%",
          right: "-10%",
          "--sharp-br": "48% 3% 52% 2% / 3% 42% 2% 48%",
          transform: "rotate(3deg)",
        } as React.CSSProperties}
      />
      {/* Sharp 3 — lower ribbon, narrower */}
      <div
        ref={(el) => { sharpsRef.current[2] = el; }}
        className="glass-sharp glass-sharp-3"
        style={{
          width: "100vw",
          height: "10vh",
          bottom: "18%",
          left: "-5%",
          "--sharp-br": "3% 50% 2% 48% / 45% 3% 50% 2%",
          transform: "rotate(-2deg)",
        } as React.CSSProperties}
      />
    </div>
  );
}
