import * as THREE from "three";
import { RIPPLE_COUNT } from "./liquidShaders";

/** uv distance between drops — smaller leaves a denser wake. */
const SPACING = 0.045;
/** Seconds between drops; rate-limits a fast stroke so it stays a wake, not a smear. */
const GAP = 0.03;
/** Age offset between drops stamped in one move, so the wake arrives staggered. */
const LAG = 0.02;
/** Hard cap per move, so a teleporting pointer can't flood the ring buffer. */
const MAX_DROPS = 6;

/** Pointer state: smoothed cursor, hover amount and a ring buffer of ripple births. */
export function createPointerTrail(el: HTMLElement, ripples: THREE.Vector3[]) {
  const target = new THREE.Vector2(0.5, 0.5);
  const last = new THREE.Vector2(1e3, 1e3);
  let cursor = 0;
  let primed = false;
  let dropAt = -1e3;
  let moveAt = -1e3;
  let hover = 0;

  /** Drop a ripple at a uv position; the trail is a ring buffer of RIPPLE_COUNT slots. */
  const emit = (x: number, y: number, t: number) => {
    ripples[cursor].set(x, y, t);
    cursor = (cursor + 1) % RIPPLE_COUNT;
    last.set(x, y);
  };

  /** Stamp drops along the segment just travelled, so a fast flick leaves the
      same unbroken wake a slow drag does instead of a couple of lone rings. */
  const paint = (t: number) => {
    const x0 = last.x;
    const y0 = last.y;
    const dx = target.x - x0;
    const dy = target.y - y0;
    const dist = Math.hypot(dx, dy);
    const steps = Math.min(Math.floor(dist / SPACING), MAX_DROPS);
    for (let i = 1; i <= steps; i++) {
      const k = (i * SPACING) / dist;
      emit(x0 + dx * k, y0 + dy * k, t - (steps - i) * LAG);
    }
  };

  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
    const t = performance.now() / 1000;
    moveAt = t;
    // The first move only anchors the trail; nothing has been travelled yet.
    if (!primed) {
      primed = true;
      last.copy(target);
      return;
    }
    if (t - dropAt < GAP) return;
    dropAt = t;
    paint(t);
  };
  const onEnter = () => {
    hover = 1;
    primed = false;
  };
  const onLeave = () => {
    hover = 0;
  };
  const onDown = () => {
    const t = performance.now() / 1000;
    moveAt = t;
    last.copy(target);
    emit(target.x, target.y, t);
  };

  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerenter", onEnter);
  el.addEventListener("pointerleave", onLeave);
  el.addEventListener("pointerdown", onDown);

  return {
    target,
    hover: () => hover,
    movedAgo: (t: number) => t - moveAt,
    detach: () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
    },
  };
}
