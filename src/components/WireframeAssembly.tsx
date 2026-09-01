import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = "#ff6b35";
const STEEL = "#5c9ead";
const LINE = "#3a424b";

/**
 * Renders a geometry as technical wireframe edges rather than shaded solid —
 * the look of a CAD viewport in hidden-line mode.
 */
function Edges({
  geometry,
  color = LINE,
  opacity = 1,
  threshold = 18,
  ...props
}: {
  geometry: THREE.BufferGeometry;
  color?: string;
  opacity?: number;
  threshold?: number;
} & Record<string, unknown>) {
  const edges = useMemo(
    () => new THREE.EdgesGeometry(geometry, threshold),
    [geometry, threshold],
  );

  useEffect(() => () => edges.dispose(), [edges]);

  return (
    <lineSegments geometry={edges} {...props}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </lineSegments>
  );
}

/**
 * A parametric pulley/flange assembly — the kind of rotating hardware
 * behind the flight-control work: a grooved sheave, a hub, a bolt circle
 * and a concentric guide ring.
 */
function PulleyAssembly() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // --- Geometry, built once -------------------------------------------
  const geo = useMemo(() => {
    // Grooved sheave profile, revolved
    const profile: THREE.Vector2[] = [];
    profile.push(new THREE.Vector2(0.62, -0.16));
    profile.push(new THREE.Vector2(1.42, -0.16));
    profile.push(new THREE.Vector2(1.58, -0.07)); // groove flank
    profile.push(new THREE.Vector2(1.58, 0.07));
    profile.push(new THREE.Vector2(1.42, 0.16));
    profile.push(new THREE.Vector2(0.62, 0.16));

    return {
      sheave: new THREE.LatheGeometry(profile, 48),
      hub: new THREE.CylinderGeometry(0.62, 0.62, 0.5, 32, 1, true),
      bore: new THREE.CylinderGeometry(0.3, 0.3, 0.62, 24, 1, true),
      ring: new THREE.TorusGeometry(2.25, 0.022, 8, 96),
      ringOuter: new THREE.TorusGeometry(2.72, 0.016, 6, 96),
      bolt: new THREE.CylinderGeometry(0.075, 0.075, 0.42, 12),
      bracket: new THREE.BoxGeometry(0.16, 1.1, 0.42),
    };
  }, []);

  useEffect(
    () => () => Object.values(geo).forEach((g) => g.dispose()),
    [geo],
  );

  // Bolt circle positions
  const bolts = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return [Math.cos(a) * 0.98, 0, Math.sin(a) * 0.98] as const;
      }),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current || !inner.current) return;

    // Steady rotation about the shaft axis
    inner.current.rotation.y += delta * 0.28;

    // Cursor parallax — damped so it feels weighted, not twitchy
    const targetX = -pointer.y * 0.28 + 0.42;
    const targetY = pointer.x * 0.4;
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      2.4,
      delta,
    );
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      targetY,
      2.4,
      delta,
    );

    // Gentle float
    group.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.07;
  });

  return (
    <group ref={group} rotation={[0.42, 0, 0]}>
      {/* Static concentric guide rings — the "datum" of the drawing */}
      <Edges
        geometry={geo.ring}
        color={LINE}
        opacity={0.55}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Edges
        geometry={geo.ringOuter}
        color={LINE}
        opacity={0.3}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Rotating assembly */}
      <group ref={inner}>
        <Edges geometry={geo.sheave} color={ACCENT} opacity={0.9} />
        <Edges geometry={geo.hub} color={STEEL} opacity={0.75} />
        <Edges geometry={geo.bore} color={STEEL} opacity={0.5} />

        {bolts.map((p, i) => (
          <Edges
            key={i}
            geometry={geo.bolt}
            color={ACCENT}
            opacity={0.6}
            position={p as unknown as THREE.Vector3}
          />
        ))}
      </group>

      {/* Fixed guide brackets, 3 o'clock and 9 o'clock */}
      <Edges
        geometry={geo.bracket}
        color={LINE}
        opacity={0.8}
        position={[2.25, 0, 0] as unknown as THREE.Vector3}
      />
      <Edges
        geometry={geo.bracket}
        color={LINE}
        opacity={0.8}
        position={[-2.25, 0, 0] as unknown as THREE.Vector3}
      />
    </group>
  );
}

/** Slowly drifting particulate to give the volume some depth. */
function Motes() {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 90;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7 - 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        color={STEEL}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

/** Static SVG shown instead of the canvas under reduced-motion. */
function StaticFallback() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full"
      aria-hidden="true"
      role="presentation"
    >
      <g
        fill="none"
        stroke={LINE}
        strokeWidth="1"
        transform="translate(200 200)"
      >
        <circle r="150" opacity="0.3" />
        <circle r="124" opacity="0.55" />
        <ellipse rx="88" ry="34" stroke={ACCENT} opacity="0.9" />
        <ellipse rx="88" ry="26" stroke={ACCENT} opacity="0.5" />
        <ellipse rx="34" ry="13" stroke={STEEL} opacity="0.75" />
        {Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={Math.cos(a) * 55}
              cy={Math.sin(a) * 21}
              r="4"
              stroke={ACCENT}
              opacity="0.6"
            />
          );
        })}
        <line x1="-150" y1="0" x2="150" y2="0" opacity="0.25" />
        <line x1="0" y1="-150" x2="0" y2="150" opacity="0.25" />
      </g>
    </svg>
  );
}

export default function WireframeAssembly() {
  const [reduced, setReduced] = useState(false);
  // Starts false so the server-rendered markup is the static SVG. The canvas
  // only replaces it after mount, which keeps the first paint instant and
  // gives no-JS and reduced-motion visitors a real image rather than a gap.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    setMounted(true);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!mounted || reduced) return <StaticFallback />;

  return (
    <Canvas
      camera={{ position: [0, 0, 7.4], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <PulleyAssembly />
      <Motes />
    </Canvas>
  );
}
