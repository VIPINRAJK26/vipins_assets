import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Cpu, Sparkles } from "lucide-react";
import avatar from "@/assets/hero-avatar.png";
import orb from "@/assets/orb.png";

// ─── constants ───────────────────────────────────────────────────────────────

const ROLES = [
  "scalable web apps",
  "e-commerce",
  "portfolios",
  "dashboards",
  "CRM platforms",
];

// Duplicated once so the seamless-loop marquee always has content visible.
const TECH = [
  "react",
  "typescript",
  "python",
  "django",
  "postgres",
  "ai",
  "realtime",
  "design systems",
];

const STATS: [string, string][] = [
  ["20+", "systems shipped"],
  ["2+", "years in orbit"],
  ["99.9%", "uptime target"],
];

// ─── component ───────────────────────────────────────────────────────────────

export function Hero() {
  // ── typewriter ──
  const [typed, setTyped] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const full = ROLES[roleIdx] ?? "";
    let i = 0;
    let erasing = false;
    // Single fixed interval; erasing flag is a closure var, not state,
    // so re-renders don't reset the character counter.
    const t = window.setInterval(() => {
      if (!erasing) {
        i++;
        setTyped(full.slice(0, i));
        if (i === full.length) erasing = true;
      } else {
        i--;
        setTyped(full.slice(0, i));
        if (i === 0) setRoleIdx((r) => (r + 1) % ROLES.length);
      }
    }, 85);
    return () => window.clearInterval(t);
  }, [roleIdx]);

  // ── pointer tilt (desktop / fine-pointer only) ──
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isPointerFine, setIsPointerFine] = useState(
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );

  useEffect(() => {
    // Subscribe to future changes (e.g. connecting a mouse to a touch device).
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    // Guard: tilt only on fine-pointer (mouse) devices; skip touch.
    if (!isPointerFine) return;
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 14,
      y: ((e.clientY - r.top) / r.height - 0.5) * -14,
    });
  };

  const handlePointerLeave = () => setTilt({ x: 0, y: 0 });

  // ── render ──
  return (
    <section id="hero" className="relative overflow-hidden pb-16 pt-36 md:pb-24">

      {/* ── Background decorative layers ── grid-floor removed */}
      {/* These are all inset-0 / absolute and don't contribute to layout width */}
      <div
        aria-hidden
        className=" absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div aria-hidden className="bg-veil absolute inset-0" />

      {/*
        Orb: absolutely positioned, clipped by the section's overflow-hidden.
        Uses a modest fixed size so it never participates in layout.
        The section's own overflow-hidden guarantees it never stretches the document.
      */}
      <img
        src={orb}
        alt=""
        aria-hidden
        width={560}
        height={560}
        className="pointer-events-none absolute -right-28 -top-20 w-[300px] animate-spin-slow opacity-35 mix-blend-screen md:w-[520px]"
      />

      {/*
        ── Main layout container ──
        - w-full keeps it from ever being wider than its parent.
        - max-w-7xl + mx-auto centres it.
        - px-4/sm:px-6/lg:px-8 gives equal, responsive horizontal padding.
        - relative so absolute children (orb, bg layers) are correctly contained.
        This is the single source of truth for the horizontal bounds of all content.
      */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/*
          Two-column grid on md+, single column (stacked) on mobile.
          min-w-0 on BOTH children is critical: without it, a flex/grid child
          defaults to min-width: auto which lets it overflow its track.
        */}
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">

          {/* ── LEFT / TOP: text content ── */}
          <div className="min-w-0">

            {/*
              Headline: clamp() keeps font size fluid.
              No whitespace-nowrap anywhere — text wraps naturally on narrow screens.
            */}
            <h1 className="font-display text-[clamp(2rem,8vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
              I engineer
              <br />
              {/*
                Typed role text. Never force nowrap here — on very narrow screens
                a long role name (e.g. "design systems") must be allowed to wrap.
              */}
              <span className="text-neon-gradient">{typed || "\u00a0"}</span>
              {/* Blinking cursor — inline-block, doesn't affect layout width */}
              <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[2px] animate-flicker bg-accent align-middle" />
              <br />
              for the next decade.
            </h1>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Software developer with 2+ years in the field and 20+ production
              systems shipped — storefronts, operational dashboards and CRMs
              built to survive scale, traffic spikes and the future.
            </p>

            {/*
              CTA buttons.
              flex-col on mobile -> buttons stack; sm:flex-row on wider screens.
              No fixed widths; buttons grow to fit their content naturally.
              shrink-0 on icons prevents icon squish if text wraps.
            */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#works"
                className="clip-hud group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-primary px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground"
              >
                <span className="relative z-10">Enter the archive</span>
                <ArrowDownRight className="relative z-10 h-4 w-4 shrink-0" />
                {/* Sweep shine — contained by parent overflow-hidden */}
                <span className="absolute inset-y-0 w-16 animate-sweep bg-primary-foreground/25 blur-md" />
              </a>

              <a
                href="#contact"
                className="clip-hud inline-flex items-center justify-center gap-2 border border-border bg-surface-2 px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                <Sparkles className="h-4 w-4 shrink-0" />
                Open channel
              </a>
            </div>

            {/*
              Statistics grid.
              grid-cols-3 with gap-2 and compact padding so all three cards
              fit inside 288px content width (320px - 2x16px padding).
              Font sizes scale up with sm: breakpoint.
            */}
            <dl className="mt-10 grid grid-cols-3 gap-2 md:max-w-md">
              {STATS.map(([value, label]) => (
                <div key={label} className="glass-panel clip-hud px-2 py-3 sm:px-3 sm:py-4">
                  <dt className="font-display text-xl font-bold text-neon-gradient sm:text-2xl md:text-3xl">
                    {value}
                  </dt>
                  <dd className="mono-label mt-1 text-[9px] !tracking-[0.1em] sm:text-[11px] sm:!tracking-[0.14em]">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── RIGHT / BOTTOM: visual stage ── */}
          {/*
            min-w-0 prevents the grid column from overflowing its track.
            perspective is applied here, not on a nested div, so 3D context
            is established at the constrained column level.
          */}
          <div
            ref={stageRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            data-cursor-hot
            className="min-w-0 [perspective:1200px]"
          >
            {/*
              Tilt wrapper: transform is only applied on fine-pointer devices.
              On touch/mobile setTilt is never called so transform stays identity.
              The transform only affects visual painting — never layout dimensions.
            */}
            <div
              className="relative transition-transform duration-300 ease-out"
              style={
                isPointerFine
                  ? { transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }
                  : undefined
              }
            >
              {/* Glow blob — absolute, inset, never exceeds parent bounds */}
              <div className="absolute inset-x-8 bottom-8 top-8 animate-pulse-glow rounded-full bg-primary/25 blur-3xl" />

              {/*
                Avatar image.
                w-full max-w-[300px] on mobile keeps it inside the column.
                On md+ max-w is removed (md:max-w-none) so it fills the column.
                mx-auto centres it on mobile.
                No ml-0, no negative margins, no absolute positioning.
              */}
              <img
                src={avatar}
                alt="Holographic developer avatar built from glowing interface panels"
                width={1024}
                height={1280}
                className="animate-float relative mx-auto w-full max-w-[300px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)] md:max-w-none"
              />

              {/*
                Floating info badges — visible only on sm+ (hidden on mobile).
                Use left-0/right-0 instead of -left-2/-right-2 to avoid
                poking outside the column bounds on sm screens.
              */}
              <div className="glass-panel clip-hud absolute left-0 top-10 hidden px-3 py-2 sm:block">
                <p className="font-mono text-[10px] text-primary">build: passing</p>
                <p className="font-mono text-[10px] text-muted-foreground">142 tests · 0 flake</p>
              </div>
              <div className="glass-panel clip-hud absolute right-0 bottom-16 hidden items-center gap-2 px-3 py-2 sm:flex">
                <Cpu className="h-3.5 w-3.5 text-accent" />
                <p className="font-mono text-[10px] text-muted-foreground">latency 38ms</p>
              </div>
            </div>

            {/*
              Technology marquee.

              CRITICAL FIX vs old implementation:
              The wrapper must have BOTH overflow-hidden AND an explicit w-full.
              Without w-full the wrapper sizes itself to its w-max content,
              causing the grid column (and the document) to overflow.

              The inner animated div keeps w-max (needed for the infinite scroll
              animation) but is fully contained by the parent's overflow-hidden.
              It never affects document layout width.

              Each tech label span gets shrink-0 so flex does not compress them.
            */}
            <div className="mt-4 w-full overflow-hidden border-y border-border/60 py-2">
              <div className="animate-marquee flex w-max gap-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {/* Two copies for a seamless loop (animation translates to -50%) */}
                {[0, 1].map((copy) => (
                  <span key={copy} className="flex shrink-0 gap-8">
                    {TECH.map((tech) => (
                      <span key={tech} className="shrink-0">
                        {tech}
                      </span>
                    ))}
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
