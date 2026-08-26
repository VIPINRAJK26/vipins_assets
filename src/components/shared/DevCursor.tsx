import { useEffect, useRef, useState } from "react";

/**
 * Developer-themed cursor: a blinking terminal caret with a magnetic ring
 * and a live coordinate readout. Desktop pointers only.
 */
export function DevCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  // Evaluate the media query once at construction — no effect needed for the initial value.
  const [enabled] = useState(
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  const [hot, setHot] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-dev");

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let tx = rx;
    let ty = ry;
    let frame = 0;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      const el = e.target as HTMLElement | null;
      setHot(Boolean(el?.closest("a, button, [data-cursor-hot]")));
    };

    const loop = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      setCoords({ x: Math.round(tx), y: Math.round(ty) });
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move);
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("cursor-dev");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div ref={dot} className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-flicker h-5 w-[2px] bg-primary shadow-[0_0_12px_var(--neon)]" />
      </div>
      <div
        ref={ring}
        className="absolute left-0 top-0 flex items-center justify-center transition-[width,height] duration-200"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/60 transition-all duration-200 ${
            hot ? "h-14 w-14 bg-primary/10" : "h-8 w-8"
          }`}
        >
          <div className="absolute left-1/2 top-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2 bg-accent/70" />
        </div>
        <span className="absolute left-6 top-5 whitespace-nowrap font-mono text-[10px] tracking-widest text-primary/70">
          {hot ? "<click/>" : `${coords.x},${coords.y}`}
        </span>
      </div>
    </div>
  );
}
