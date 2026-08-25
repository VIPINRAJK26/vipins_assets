import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Cpu, Sparkles } from "lucide-react";
import avatar from "@/assets/hero-avatar.png";
import orb from "@/assets/orb.png";

const ROLES = ["scalable web apps", "commerce engines", "realtime dashboards", "CRM platforms"];

export function Hero() {
  const [typed, setTyped] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const full = ROLES[roleIdx] ?? "";
    let i = 0;
    let erasing = false;
    const t = window.setInterval(() => {
      if (!erasing) {
        i++;
        setTyped(full.slice(0, i));
        if (i === full.length) {
          erasing = true;
          window.setTimeout(() => {}, 0);
        }
      } else {
        i--;
        setTyped(full.slice(0, i));
        if (i === 0) {
          setRoleIdx((r) => (r + 1) % ROLES.length);
        }
      }
    }, erasing ? 40 : 85);
    return () => window.clearInterval(t);
  }, [roleIdx]);

  const onMove = (e: React.PointerEvent) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 16,
      y: ((e.clientY - r.top) / r.height - 0.5) * -16,
    });
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-24 pb-16 md:pt-36 md:pb-24">
      <div className="grid-floor absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="bg-veil absolute inset-0" />
      <img
        src={orb}
        alt=""
        aria-hidden
        width={1024}
        height={1024}
        className="pointer-events-none absolute -right-24 -top-24 w-[420px] animate-spin-slow opacity-40 mix-blend-screen md:w-[620px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
          <div>
            <div className="glass-panel clip-hud mb-6 inline-flex items-center gap-2 px-3 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
              <span className="mono-label !tracking-[0.2em]">available · node_0x2050</span>
            </div>

            <h1 className="font-display text-[2.6rem] leading-[1.02] font-bold tracking-tight sm:text-6xl lg:text-7xl">
              I engineer
              <br />
              <span className="text-neon-gradient">{typed || "\u00a0"}</span>
              <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[2px] animate-flicker bg-accent align-middle" />
              <br />
              for the next decade.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Software developer with 2+ years in the field and 20+ production systems
              shipped — storefronts, operational dashboards and CRMs built to survive
              scale, traffic spikes and the future.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#works"
                className="clip-hud group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-primary px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground"
              >
                <span className="relative z-10">Enter the archive</span>
                <ArrowDownRight className="relative z-10 h-4 w-4" />
                <span className="absolute inset-y-0 w-16 animate-sweep bg-primary-foreground/25 blur-md" />
              </a>
              <a
                href="#contact"
                className="clip-hud inline-flex items-center justify-center gap-2 border border-border bg-surface-2 px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                <Sparkles className="h-4 w-4" />
                Open channel
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-3 md:max-w-md">
              {[
                ["20+", "systems shipped"],
                ["2+", "years in orbit"],
                ["99.9%", "uptime target"],
              ].map(([v, k]) => (
                <div key={k} className="glass-panel clip-hud px-3 py-4">
                  <dt className="font-display text-2xl font-bold text-neon-gradient md:text-3xl">{v}</dt>
                  <dd className="mono-label mt-1 !tracking-[0.14em]">{k}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* interactive holo stage */}
          <div
            ref={stageRef}
            onPointerMove={onMove}
            onPointerLeave={() => setTilt({ x: 0, y: 0 })}
            data-cursor-hot
            className="relative mx-auto w-full max-w-md [perspective:1200px]"
          >
            <div
              className="relative transition-transform duration-300 ease-out"
              style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
            >
              <div className="absolute inset-x-6 bottom-8 top-8 animate-pulse-glow rounded-full bg-primary/25 blur-3xl" />
              <img
                src={avatar}
                alt="Holographic developer avatar built from glowing interface panels"
                width={1024}
                height={1280}
                className="animate-float relative mx-auto w-[78%] drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)] md:w-full"
              />

              <div className="glass-panel clip-hud absolute -left-2 top-10 hidden px-3 py-2 sm:block">
                <p className="font-mono text-[10px] text-primary">build: passing</p>
                <p className="font-mono text-[10px] text-muted-foreground">142 tests · 0 flake</p>
              </div>
              <div className="glass-panel clip-hud absolute -right-2 bottom-16 hidden items-center gap-2 px-3 py-2 sm:flex">
                <Cpu className="h-3.5 w-3.5 text-accent" />
                <p className="font-mono text-[10px] text-muted-foreground">latency 38ms</p>
              </div>
            </div>

            <div className="mt-4 overflow-hidden border-y border-border/60 py-2">
              <div className="animate-marquee flex w-max gap-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {Array.from({ length: 2 }).map((_, r) => (
                  <span key={r} className="flex gap-8">
                    <span>react</span><span>typescript</span><span>node</span><span>postgres</span>
                    <span>edge</span><span>ai</span><span>realtime</span><span>design systems</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
