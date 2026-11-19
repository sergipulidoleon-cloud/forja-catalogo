/**
 * One mutable pointer/gyro store shared by the hero scenes. Values are in
 * [-1, 1]; scenes read them inside useFrame and damp them themselves, so the
 * pointer never triggers React renders.
 */
export const tilt = { x: 0, y: 0, active: false, scroll: 0 };

let started = false;

export function startTilt() {
  if (started || typeof window === 'undefined') return;
  started = true;

  window.addEventListener(
    'pointermove',
    (e) => {
      tilt.x = (e.clientX / window.innerWidth) * 2 - 1;
      tilt.y = -((e.clientY / window.innerHeight) * 2 - 1);
      tilt.active = true;
    },
    { passive: true },
  );

  window.addEventListener(
    'scroll',
    () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      tilt.scroll = window.scrollY / max;
    },
    { passive: true },
  );

  // Android and desktop browsers fire deviceorientation without a prompt.
  attachOrientation();
}

function onOrientation(e: DeviceOrientationEvent) {
  if (e.gamma == null || e.beta == null) return;
  // gamma: left/right [-90, 90]; beta: front/back [-180, 180], ~45 when held.
  tilt.x = Math.max(-1, Math.min(1, e.gamma / 30));
  tilt.y = Math.max(-1, Math.min(1, -(e.beta - 45) / 30));
  tilt.active = true;
}

let orientationAttached = false;
function attachOrientation() {
  if (orientationAttached) return;
  orientationAttached = true;
  window.addEventListener('deviceorientation', onOrientation, { passive: true });
}

type IOSOrientation = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<'granted' | 'denied'> };

/** iOS needs a user gesture before it hands out orientation data. */
export function needsMotionPermission() {
  return typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as IOSOrientation).requestPermission === 'function';
}

export async function requestMotionPermission() {
  const D = DeviceOrientationEvent as IOSOrientation;
  if (typeof D.requestPermission !== 'function') return true;
  try {
    const res = await D.requestPermission();
    if (res === 'granted') {
      orientationAttached = false;
      attachOrientation();
      return true;
    }
  } catch {
    /* denied or unsupported */
  }
  return false;
}
