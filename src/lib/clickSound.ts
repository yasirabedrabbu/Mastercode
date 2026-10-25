"use client";

/** Short, soft synthesized "tick" inspired by iOS UI clicks (Web Audio, no asset). */
let ctx: AudioContext | null = null;
const KEY = "ui-sound";

export const soundEnabled = () => typeof window !== "undefined" && localStorage.getItem(KEY) !== "off";
export const setSoundEnabled = (on: boolean) => localStorage.setItem(KEY, on ? "on" : "off");

export function playClick() {
  if (!soundEnabled()) return;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const t = ctx.currentTime;
    // Tiny noise burst through a band-pass for the crisp "tap".
    const len = Math.floor(ctx.sampleRate * 0.012);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 3200;
    bp.Q.value = 1.2;
    // Short pitched body for the soft "tock".
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1800, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.03);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.18, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    noise.connect(bp).connect(g);
    osc.connect(g);
    g.connect(ctx.destination);
    noise.start(t);
    osc.start(t);
    osc.stop(t + 0.06);
  } catch {
    /* audio unavailable */
  }
}

/** Very soft, short tick, like the detents of a trackpad scroll. */
export function playScrollTick(intensity = 1) {
  if (!soundEnabled() || !ctx || ctx.state !== "running") return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(2600 + Math.random() * 300, t);
  osc.frequency.exponentialRampToValueAtTime(1400, t + 0.012);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.035 * intensity, t + 0.001);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);
  osc.connect(g).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.02);
}

/** Browsers only allow audio after a user gesture; unlock on the first one. */
export function unlockAudio() {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
  } catch {
    /* audio unavailable */
  }
}
