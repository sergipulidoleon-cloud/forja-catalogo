export { createI18n, type Lang } from './i18n';
export { kitStrings, type KitStrings } from './strings';
export { gsap, ScrollTrigger, ease, useSmoothScroll, useScrollScene, useReducedMotionPref, prefersReducedMotion, getLenis } from './motion';
export { LazyScene, type SceneProps } from './LazyScene';
export { Toaster, demoToast, demoAction, Cursor, LangToggle, MapEmbed, DemoNote, DemoTag, SkipLink, PhotoSlot, BookingForm } from './ui';

/** Returns the poster generated from the live scene (./poster.webp) if it exists. */
export function posterFrom(globbed: Record<string, unknown>): string | undefined {
  const first = Object.values(globbed)[0];
  return typeof first === 'string' ? first : undefined;
}
