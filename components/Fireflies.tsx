"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";

// Hue palette: turquoise, blue, light violet
const HUES = [185, 190, 195, 210, 215, 275, 280];

const SWARMS = [
  { drift: "drift-a", top: "15%", left: "10%", dur: "95s", depth: 0.15, count: 18 },
  { drift: "drift-b", top: "45%", left: "55%", dur: "85s", depth: 0.25, count: 14 },
  { drift: "drift-c", top: "30%", left: "35%", dur: "105s", depth: 0.35, count: 12 },
];

function generateFlies(swarmIndex: number, count: number) {
  const flies = [];
  for (let i = 0; i < count; i++) {
    // Deterministic pseudo-random based on indices
    const seed = swarmIndex * 100 + i;
    const rand = (n: number) => {
      const x = Math.sin(seed * 9301 + n * 49297) * 49297;
      return x - Math.floor(x);
    };
    flies.push({
      hue: HUES[(seed + i) % HUES.length],
      ox: `${Math.floor((rand(1) - 0.5) * 500)}px`,
      oy: `${Math.floor((rand(2) - 0.5) * 500)}px`,
      glowDur: `${(5 + rand(3) * 12).toFixed(1)}s`,
      fdur: `${(8 + rand(4) * 6).toFixed(1)}s`,
    });
  }
  return flies;
}

export default function Fireflies() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const swarmData = useMemo(
    () => SWARMS.map((s, i) => ({ ...s, flies: generateFlies(i, s.count) })),
    []
  );

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <div className="fireflies" aria-hidden="true">
      {swarmData.map((swarm, si) => (
        <div
          key={si}
          className={`swarm ${swarm.drift}`}
          style={{
            top: swarm.top,
            left: swarm.left,
            "--swarm-dur": swarm.dur,
            "--depth": swarm.depth,
          } as React.CSSProperties}
        >
          {swarm.flies.map((fly, fi) => (
            <span
              key={fi}
              className="fly"
              style={{
                "--ox": fly.ox,
                "--oy": fly.oy,
                "--glow-dur": fly.glowDur,
                "--fdur": fly.fdur,
                "--hue": fly.hue,
                "--depth": SWARMS[si].depth + (fi % 5) * 0.08,
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
