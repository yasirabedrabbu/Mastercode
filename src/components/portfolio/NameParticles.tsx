"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; hx: number; hy: number; vx: number; vy: number };

/** Full name drawn as particles that scatter away from the cursor and spring back. */
export default function NameParticles({ text }: { text: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio, 2);
    let particles: P[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const w = canvas.clientWidth;
      if (w === 0) return; // not laid out yet; ResizeObserver will retry
      const fontSize = Math.min(w / (text.length * 0.52), 220);
      const h = Math.ceil(fontSize * 1.1);
      canvas.style.height = `${h}px`;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const family = getComputedStyle(canvas).fontFamily;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fff";
      ctx.font = `700 ${fontSize}px ${family}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, w / 2, h / 2);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const gap = Math.max(3, Math.round(w / 260)) * dpr;
      particles = [];
      for (let y = 0; y < canvas.height; y += gap)
        for (let x = 0; x < canvas.width; x += gap)
          if (data[(y * canvas.width + x) * 4 + 3] > 128) {
            const px = x / dpr, py = y / dpr;
            particles.push({ x: px, y: py, hx: px, hy: py, vx: 0, vy: 0 });
          }
      draw();
    };

    const draw = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(201, 162, 75, 0.7)";
      for (const p of particles) ctx.fillRect(p.x, p.y, 1.8, 1.8);
    };

    const tick = () => {
      const r = 90;
      for (const p of particles) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < r * r) {
          const d = Math.sqrt(d2) || 1;
          const f = (r - d) / r;
          p.vx += (dx / d) * f * 6;
          p.vy += (dy / d) * f * 6;
        }
        p.vx += (p.hx - p.x) * 0.06;
        p.vy += (p.hy - p.y) * 0.06;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      mouse.x = e.clientX - b.left;
      mouse.y = e.clientY - b.top;
    };
    const onLeave = () => ((mouse.x = -9999), (mouse.y = -9999));

    let alive = true;
    document.fonts.ready.then(() => alive && build());
    let lastW = 0;
    const ro = new ResizeObserver(() => {
      if (canvas.clientWidth !== lastW) {
        lastW = canvas.clientWidth;
        build();
      }
    });
    ro.observe(canvas);
    if (!reduce) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
      tick();
    }
    return () => {
      cancelAnimationFrame(raf);
      alive = false;
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [text]);

  return <canvas ref={ref} aria-hidden className="block w-full font-display" />;
}
