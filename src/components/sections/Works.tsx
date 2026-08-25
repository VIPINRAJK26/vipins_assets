import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ecom from "@/assets/work-ecom.jpg";
import crm from "@/assets/work-crm.jpg";
import dash from "@/assets/work-dash.jpg";
import saas from "@/assets/work-saas.jpg";
import { Reveal } from "../animation/Reveal";

const WORKS = [
  {
    id: "NX-001",
    title: "Fleeby",
    kind: "E-commerce",
    image: ecom,
    metric: "568 orders / yr",
    body: "Headless storefront with edge-rendered catalog, instant search and a checkout that survives launch-day spikes.",
    stack: ["React", "Django", "Razorpay", "Postgres"],
  },
  {
    id: "NX-002",
    title: "Quick Bill",
    kind: "Billing App",
    image: dash,
    metric: "100+ Invoices/day",
    body: "A billing app to generate invoices, track payments, and manage clients.",
    stack: ["React", "PWA", "indexedDb"],
  },
  {
    id: "NX-003",
    title: "Fifth Byte",
    kind: "Portfolio",
    image: crm,
    metric: "",
    body: "A website for a software company",
    stack: ["React", "Tailwind", "Typescript"],
  },
  {
    id: "NX-004",
    title: "Twinkle Offset",
    kind: "Portfolio",
    image: saas,
    metric: "",
    body: "Business Portfolio for a leading offset printing press",
    stack: ["React", "Tailwind", "Typescript"],
  },
  {
    id: "NX-005",
    title: "Misty Hill Spices",
    kind: "Portfolio",
    image: saas,
    metric: "",
    body: "Business Portfolio for a spices export company",
    stack: ["React", "Tailwind", "Typescript"],
  },
  {
    id: "NX-006",
    title: "exedu CRM",
    kind: "CRM",
    image: saas,
    metric: "",
    body: "An app to manage  a educational institution",
    stack: ["React", "Tailwind css", "Rest Framework", "Typescript"],
  },
  {
    id: "NX-007",
    title: "extechnology",
    kind: "Portfolio",
    image: saas,
    metric: "",
    body: "Business Portfolio for a leading technology company",
    stack: ["React", "Tailwind css", "Typescript"],
  },
];

export function Works() {
  const [open, setOpen] = useState<string | null>(WORKS[0]?.id ?? null);

  return (
    <section id="works" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mono-label">// 02 — deployment archive</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-xl font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Selected <span className="text-neon-gradient">systems</span> in production
            </h2>
            <p className="font-mono text-xs text-muted-foreground">04 of 20+ records shown</p>
          </div>
        </Reveal>

        {/* mobile: expandable holo cards */}
        <div className="mt-10 space-y-4 md:hidden">
          {WORKS.map((w) => {
            const expanded = open === w.id;
            return (
              <article key={w.id} className="glass-panel clip-hud overflow-hidden">
                <button
                  onClick={() => setOpen(expanded ? null : w.id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                >
                  <span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-primary">{w.id}</span>
                    <span className="mt-1 block font-display text-lg font-semibold">{w.title}</span>
                  </span>
                  <ArrowUpRight
                    className={`h-4 w-4 shrink-0 text-primary transition-transform duration-300 ${
                      expanded ? "rotate-90" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ${
                    expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4">
                      <div className="scanlines overflow-hidden rounded">
                        <img
                          src={w.image}
                          alt={`${w.title} interface`}
                          loading="lazy"
                          width={1024}
                          height={768}
                          className="w-full"
                        />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="border border-primary/50 px-2 py-1 font-mono text-[10px] text-primary">
                          {w.metric}
                        </span>
                        {w.stack.map((s) => (
                          <span
                            key={s}
                            className="border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* desktop: staggered holo grid */}
        <div className="mt-14 hidden gap-6 md:grid md:grid-cols-12">
          {WORKS.map((w, i) => (
            <Reveal
              key={w.id}
              delay={i * 110}
              className={
                i % 3 === 0
                  ? "md:col-span-7"
                  : i % 3 === 1
                    ? "md:col-span-5 md:mt-14"
                    : "md:col-span-5"
              }
            >
              <article
                data-cursor-hot
                className="glass-panel clip-hud group relative h-full overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:glow-aura"
              >
                <div className="scanlines relative overflow-hidden">
                  <img
                    src={w.image}
                    alt={`${w.title} interface`}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="w-full transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <span className="absolute left-4 top-4 border border-primary/60 bg-background/70 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-primary backdrop-blur">
                    {w.id} · {w.kind}
                  </span>
                  <span className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-foreground/10 opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-bold">{w.title}</h3>
                    <span className="whitespace-nowrap font-mono text-[11px] text-accent">{w.metric}</span>
                  </div>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{w.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {w.stack.map((s) => (
                      <span
                        key={s}
                        className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-primary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
