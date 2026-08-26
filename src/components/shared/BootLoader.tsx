import { useEffect, useState } from "react";

const LINES = [
  "$ init vipin.dev --year 2026",
  "> mounting neural interface ......... ok",
  "> compiling 20+ shipped systems ..... ok",
  "> linking commerce / crm / dashboards",
  "> hydrating experience ............. ready",
];

export function BootLoader() {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 13 + 4);
        setStep(Math.min(LINES.length, Math.ceil((next / 100) * LINES.length)));
        return next;
      });
    }, 170);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const a = window.setTimeout(() => setFading(true), 320);
    const b = window.setTimeout(() => setGone(true), 1100);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [progress]);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background px-6 transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="grid-floor absolute inset-0 opacity-60" />
      <div className="bg-veil absolute inset-0" />

      <div className="relative w-full max-w-md">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center">
          <div className="absolute h-20 w-20 animate-spin-slow rounded-full border border-dashed border-primary/50" />
          <div className="absolute h-14 w-14 animate-pulse-glow rounded-full bg-primary/20 blur-md" />
          <span className="relative font-mono text-xl font-bold text-neon-gradient">&lt;/&gt;</span>
        </div>

        <div className="glass-panel clip-hud p-4">
          <div className="mono-label mb-3 flex justify-between">
            <span>booting</span>
            <span className="text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="relative h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-[width] duration-200"
              style={{ width: `${progress}%`, backgroundImage: "var(--gradient-neon)" }}
            />
          </div>
          <div className="mt-4 space-y-1 font-mono text-[11px] leading-relaxed text-muted-foreground">
            {LINES.slice(0, step).map((line) => (
              <p key={line} className="truncate">
                {line}
              </p>
            ))}
            <span className="inline-block h-3 w-1.5 animate-flicker bg-primary align-middle" />
          </div>
        </div>
      </div>
    </div>
  );
}
