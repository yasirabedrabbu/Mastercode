"use client";

/**
 * Apple-style UI sounds rebuilt with the Web Audio API. macOS ships its click
 * and scroll cues as copyrighted assets, so we reproduce their measured
 * acoustic profile instead: a sub-60 ms transient whose energy sits near
 * 1.9 kHz on ABS keycaps and 2.7 kHz on magnesium, with a fast resonant decay.
 */
type Voice = { crack: number; body: number; decay: number; gain: number };

/** Three hardware feels: MacBook key, iMac body and the trackpad scroll detent. */
const VOICES = {
  macbook: { crack: 2550, body: 1180, decay: 0.048, gain: 0.5 },
  imac: { crack: 1880, body: 880, decay: 0.064, gain: 0.55 },
  scroll: { crack: 3150, body: 1500, decay: 0.026, gain: 0.24 },
} satisfies Record<string, Voice>;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
const KEY = "ui-sound"; // opt-in: only an explicit "on" turns sound on
const listeners = new Set<() => void>();

export const soundEnabled = () => typeof window !== "undefined" && localStorage.getItem(KEY) === "on";

export const setSoundEnabled = (on: boolean) => {
  localStorage.setItem(KEY, on ? "on" : "off");
  listeners.forEach((notify) => notify());
};

/** Subscribes to sound-preference changes — for `useSyncExternalStore`. */
export const subscribeSound = (onChange: () => void) => {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
};

/** Lazily builds the graph; browsers only allow audio after a user gesture. */
function ensure(): AudioContext | null {
  try {
    ctx ??= new AudioContext();
    if (!master) {
      master = ctx.createGain();
      master.gain.value = 0.6;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

/** Filtered noise burst — the crisp attack of a physical click. */
function crackle(c: AudioContext, out: GainNode, at: number, freq: number, decay: number, gain: number) {
  const buf = c.createBuffer(1, Math.max(1, Math.floor(c.sampleRate * decay)), c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 2;
  const src = c.createBufferSource();
  src.buffer = buf;
  const band = c.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = freq;
  band.Q.value = 0.9;
  const g = c.createGain();
  g.gain.setValueAtTime(gain, at);
  g.gain.exponentialRampToValueAtTime(0.0001, at + decay);
  src.connect(band).connect(g).connect(out);
  src.start(at);
  src.stop(at + decay);
}

/** Pitched body — the warm "thock" underneath the transient. */
function thock(c: AudioContext, out: GainNode, at: number, freq: number, decay: number, gain: number) {
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, at);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.62, at + decay);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(gain, at + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, at + decay);
  osc.connect(g).connect(out);
  osc.start(at);
  osc.stop(at + decay + 0.01);
}

function play(voice: Voice, scale = 1) {
  const c = ensure();
  if (!c || !master) return;
  const at = c.currentTime;
  const jitter = 0.94 + Math.random() * 0.12; // micro-variation keeps repeats natural
  crackle(c, master, at, voice.crack * jitter, voice.decay * 0.4, voice.gain * scale);
  thock(c, master, at, voice.body * jitter, voice.decay, voice.gain * scale);
}

/** A single hardware-accurate click (MacBook profile). */
export function playClick() {
  if (soundEnabled()) play(VOICES.macbook);
}

/** Softer, higher detent for each notch of scroll travel. */
export function playScrollTick(intensity = 1) {
  if (soundEnabled() && ctx?.state === "running") play(VOICES.scroll, Math.min(1, intensity));
}

/** Browsers allow audio only after a gesture; no-op until sound is opted in. */
export function unlockAudio() {
  if (soundEnabled()) ensure();
}
