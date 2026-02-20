"use client";

export default function GlassWaves() {
  return (
    <div className="glass-waves" aria-hidden="true">
      {/* Wave 1 — large primary sweep, top-left */}
      <div
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
      {/* Wave 2 — accent diagonal, mid-right */}
      <div
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
      {/* Wave 3 — blended hues, bottom-left */}
      <div
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
      {/* Wave 4 — deep subtle, center */}
      <div
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
    </div>
  );
}
