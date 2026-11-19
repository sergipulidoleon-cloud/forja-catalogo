export { createI18n, type Lang } from './i18n';
export { kitStrings, type KitStrings } from './strings';
export { gsap, ScrollTrigger, ease, useSmoothScroll, useScrollScene, useReducedMotionPref, prefersReducedMotion, getLenis } from './motion';
export { LazyScene, type SceneProps } from './LazyScene';
export { Toaster, demoToast, demoAction, Cursor, LangToggle, MapEmbed, DemoNote, DemoTag, ModelCredit, SkipLink, PhotoSlot, BookingForm } from './ui';

/** Returns the poster generated from the live scene (./poster.webp) if it exists. */
export function posterFrom(globbed: Record<string, unknown>): string | undefined {
  // Prefer the AVIF render; older demos still ship a WebP poster.
  const key = Object.keys(globbed).sort((a, b) => Number(b.endsWith('.avif')) - Number(a.endsWith('.avif')))[0];
  const first = key ? globbed[key] : undefined;
  return typeof first === 'string' ? first : undefined;
}
