"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";
import { useColorTheme, type ColorTheme } from "./ColorThemeProvider";

const THEME_HUES: Record<ColorTheme, number[]> = {
  nordsee:      [185, 190, 195, 210, 215, 275, 280],
  brandung:     [180, 185, 195, 200, 210, 230, 245],
  tiefsee:      [195, 205, 215, 230, 245, 255, 265],
  kuestennebel: [185, 190, 195, 200, 210, 220, 230],
  polarlicht:   [195, 210, 220, 235, 250, 265, 275],
  maschine:     [185, 195, 205, 215, 220, 230, 240],
};

const SWARMS = [
  { drift: "drift-a", top: "10%", left: "5%", dur: "95s", depth: 0.15, count: 22 },
  { drift: "drift-b", top: "50%", left: "60%", dur: "85s", depth: 0.30, count: 18 },
  { drift: "drift-c", top: "25%", left: "35%", dur: "105s", depth: 0.45, count: 16 },
  { drift: "drift-a", top: "70%", left: "15%", dur: "110s", depth: 0.20, count: 14 },
];

function generateFlies(swarmIndex: number, count: number, hues: number[]) {
  const flies = [];
  for (let i = 0; i < count; i++) {
    const seed = swarmIndex * 100 + i;
    const rand = (n: number) => {
      const x = Math.sin(seed * 9301 + n * 49297) * 49297;
      return x - Math.floor(x);
    };
    flies.push({
      hue: hues[(seed + i) % hues.length],
      ox: `${Math.floor((rand(1) - 0.5) * 700)}px`,
      oy: `${Math.floor((rand(2) - 0.5) * 700)}px`,
      glowDur: `${(5 + rand(3) * 12).toFixed(1)}s`,
      fdur: `${(8 + rand(4) * 6).toFixed(1)}s`,
    });
  }
  return flies;
}

export default function Fireflies() {
  const { resolvedTheme } = useTheme();
  const { colorTheme } = useColorTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const hues = THEME_HUES[colorTheme] ?? THEME_HUES.nordsee;

  const swarmData = useMemo(
    () => SWARMS.map((s, i) => ({ ...s, flies: generateFlies(i, s.count, hues) })),
    [hues]
  );

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fireflies" aria-hidden="true">
      {isDark && swarmData.map((swarm, si) => (
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
