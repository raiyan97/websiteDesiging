import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "hover">("default");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      if (hidden) setHidden(false);
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='hover'], input, textarea, select"))
        setVariant("hover");
      else setVariant("default");
    };

    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, [hidden]);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  const isHover = variant === "hover";

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-primary mix-blend-screen"
        style={{
          opacity: hidden ? 0 : 1,
          boxShadow: "0 0 12px var(--electric), 0 0 30px var(--neon)",
          transition: "opacity 200ms",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border mix-blend-screen"
        style={{
          width: isHover ? 56 : 32,
          height: isHover ? 56 : 32,
          borderColor: isHover ? "var(--neon)" : "var(--electric)",
          background: isHover ? "oklch(0.62 0.24 300 / 0.12)" : "transparent",
          boxShadow: isHover
            ? "0 0 30px oklch(0.62 0.24 300 / 0.5), inset 0 0 20px oklch(0.62 0.24 300 / 0.2)"
            : "0 0 16px oklch(0.66 0.21 264 / 0.4)",
          opacity: hidden ? 0 : 1,
          transition: "width 250ms cubic-bezier(.22,1,.36,1), height 250ms cubic-bezier(.22,1,.36,1), background 250ms, border-color 250ms, box-shadow 250ms, opacity 200ms",
        }}
      />
    </>
  );
}
