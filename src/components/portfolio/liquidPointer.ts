import * as THREE from "three";
import { RIPPLE_COUNT } from "./liquidShaders";

/** Pointer state: smoothed cursor, hover amount and a ring buffer of ripple births. */
export function createPointerTrail(el: HTMLElement, ripples: THREE.Vector3[]) {
  const target = new THREE.Vector2(0.5, 0.5);
  const lastEmit = new THREE.Vector2(1e3, 1e3);
  let cursor = 0;
  let lastEmitTime = -1e3;
  let moveAt = -1e3;
  let hover = 0;

  /** Drop a ripple at a uv position; the trail is a ring buffer of RIPPLE_COUNT slots. */
  const emit = (x: number, y: number, t: number) => {
    ripples[cursor].set(x, y, t);
    cursor = (cursor + 1) % RIPPLE_COUNT;
    lastEmit.set(x, y);
    lastEmitTime = t;
  };

  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
    const t = performance.now() / 1000;
    moveAt = t;
    // Space ripples out so the wake reads as distinct widening rings, not one blob.
    if (t - lastEmitTime > 0.09 && lastEmit.distanceTo(target) > 0.04) emit(target.x, target.y, t);
  };
  const onEnter = () => {
    hover = 1;
  };
  const onLeave = () => {
    hover = 0;
  };
  const onDown = () => {
    moveAt = performance.now() / 1000;
    emit(target.x, target.y, moveAt);
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
