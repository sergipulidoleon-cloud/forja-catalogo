import { Suspense, lazy, useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import { needsMotionPermission, requestMotionPermission, startTilt } from './tilt';
import type { KitStrings } from './strings';

export type SceneProps = { active: boolean; reduced: boolean; onReady: () => void };

type Props = {
  load: () => Promise<{ default: ComponentType<SceneProps> }>;
  /** Poster rendered from the real scene; used before WebGL loads and as the no-WebGL fallback. */
  poster?: string;
  posterAlt: string;
  kit: KitStrings;
  reduced: boolean;
  className?: string;
  /** Show the iOS "move with your phone" chip. */
  gyro?: boolean;
};

/** SwiftShader / llvmpipe mean no GPU: a continuous WebGL loop would block the main thread. */
function softwareRenderer() {
  try {
    const gl = document.createElement('canvas').getContext('webgl');
    if (!gl) return true;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    return /swiftshader|llvmpipe|software|basic render/i.test(name);
  } catch {
    return true;
  }
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Defers three.js until the page has painted and gone idle (or the visitor
 * interacts), keeps the canvas paused while off screen, and falls back to the
 * poster when WebGL is unavailable.
 */
export function LazyScene({ load, poster, posterAlt, kit, reduced, className, gyro = true }: Props) {
  const Scene = useMemo(() => lazy(load), [load]);
  const ref = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const [webgl] = useState(() => (typeof document === 'undefined' ? true : hasWebGL()));
  const [askMotion, setAskMotion] = useState(false);

  useEffect(() => {
    startTilt();
    if (!webgl) return;
    // Facade pattern: the poster (a render of this very scene) is the first paint;
    // three.js loads on the visitor's first interaction, never during the initial load.
    const force = new URLSearchParams(location.search).has('force3d');
    if (!force && softwareRenderer()) return; // keep the poster on GPU-less devices
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      setMount(true);
      cleanup();
    };
    const events = ['pointerdown', 'pointermove', 'wheel', 'touchstart', 'keydown', 'scroll'] as const;
    events.forEach((e) => window.addEventListener(e, go, { passive: true }));
    if (force) go();
    function cleanup() {
      events.forEach((e) => window.removeEventListener(e, go));
    }
    return cleanup;
  }, [webgl]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: '80px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (gyro && ready && needsMotionPermission() && window.matchMedia('(pointer: coarse)').matches) setAskMotion(true);
  }, [gyro, ready]);

  return (
    <div ref={ref} className={`kit-scene ${className ?? ''}`} data-ready={ready || undefined} role="img" aria-label={posterAlt}>
      {poster && <img className="kit-scene__poster" src={poster} alt="" decoding="async" fetchPriority="high" />}
      {webgl && mount && (
        <Suspense fallback={null}>
          <div className="kit-scene__canvas" aria-hidden="true">
            <Scene active={active} reduced={reduced} onReady={() => setReady(true)} />
          </div>
        </Suspense>
      )}
      {askMotion && (
        <button
          type="button"
          className="kit-scene__motion"
          onClick={async () => {
            const ok = await requestMotionPermission();
            if (ok) setAskMotion(false);
          }}
        >
          {kit.motionEnable}
        </button>
      )}
    </div>
  );
}
