"use client";

export default function GlassWaves() {
  return (
    <div className="glass-waves" aria-hidden="true">
      {/* === Soft glow layers (background atmosphere) === */}

      {/* Glow 1 — large primary sweep, top-left */}
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
      {/* Glow 2 — accent diagonal, mid-right */}
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
      {/* Glow 3 — blended hues, bottom-left */}
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
      {/* Glow 4 — deep subtle, center */}
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

      {/* === Sharp glass panes (hard edges, depth) === */}

      {/* Sharp 1 — wide ribbon cutting diagonally across top */}
      <div
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
