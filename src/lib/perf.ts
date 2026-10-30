/** Coarse device probe: phones and low-core machines take the lighter GPU path. */
export function isLowPower() {
  if (typeof window === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  return window.matchMedia("(max-width: 767px)").matches || cores <= 4 || memory <= 4;
}

/** Device pixel ratio, held back so a canvas never renders more pixels than it can afford. */
export function cappedDpr(max: number) {
  const dpr = window.devicePixelRatio || 1;
  return Math.min(dpr, isLowPower() ? Math.min(max, 1.25) : max);
}

/** Calls back with `true` only while the element is on screen *and* the tab is foregrounded. */
export function observeOnScreen(el: Element, onChange: (onScreen: boolean) => void) {
  let inView = false;
  const emit = () => onChange(inView && !document.hidden);
  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    emit();
  });
  io.observe(el);
  document.addEventListener("visibilitychange", emit);
  return () => {
    io.disconnect();
    document.removeEventListener("visibilitychange", emit);
  };
}

/** Drives `frame` at 60fps, but only while the element is on screen and the tab is visible. */
export function animateOnScreen(el: Element, frame: () => void) {
  let raf = 0;
  const loop = () => {
    frame();
    raf = requestAnimationFrame(loop);
  };
  const stop = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };
  const release = observeOnScreen(el, (on) => {
    if (on) raf ||= requestAnimationFrame(loop);
    else stop();
  });
  return () => {
    stop();
    release();
  };
}
