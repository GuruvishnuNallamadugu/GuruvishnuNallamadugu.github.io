import { useEffect, useMemo, useRef, useState, useCallback } from "react";

/* ============================================================
   ORBITAL MECHANICS
   Canonical heliocentric units: distance in AU, time in years.
   With those units the gravitational parameter of the Sun is
   mu = 4*pi^2 AU^3/yr^2, and 1 AU/yr = 4.74057 km/s.
   ============================================================ */

const MU = 4 * Math.PI ** 2;
const AU_YR_TO_KM_S = 4.74057;

interface Elements {
  /** Semi-major axis, AU */
  a: number;
  /** Eccentricity */
  e: number;
  /** Argument of periapsis, radians */
  omega: number;
}

interface State {
  /** Position, AU */
  r: [number, number];
  /** Velocity, AU/yr */
  v: [number, number];
}

/** Orbital elements -> inertial state vector at true anomaly nu. */
function stateFromElements(el: Elements, nu: number): State {
  const { a, e, omega } = el;
  const p = a * (1 - e * e);
  const r = p / (1 + e * Math.cos(nu));

  // Perifocal frame
  const xP = r * Math.cos(nu);
  const yP = r * Math.sin(nu);
  const k = Math.sqrt(MU / p);
  const vxP = -k * Math.sin(nu);
  const vyP = k * (e + Math.cos(nu));

  // Rotate by argument of periapsis into the inertial frame
  const c = Math.cos(omega);
  const s = Math.sin(omega);
  return {
    r: [xP * c - yP * s, xP * s + yP * c],
    v: [vxP * c - vyP * s, vxP * s + vyP * c],
  };
}

/** Inertial state vector -> orbital elements. */
function elementsFromState(st: State): Elements & { valid: boolean } {
  const [x, y] = st.r;
  const [vx, vy] = st.v;

  const r = Math.hypot(x, y);
  const v2 = vx * vx + vy * vy;

  // Specific orbital energy -> semi-major axis (vis-viva, rearranged)
  const energy = v2 / 2 - MU / r;
  const a = -MU / (2 * energy);

  // Eccentricity vector
  const rdotv = x * vx + y * vy;
  const f = v2 - MU / r;
  const ex = (f * x - rdotv * vx) / MU;
  const ey = (f * y - rdotv * vy) / MU;
  const e = Math.hypot(ex, ey);

  return {
    a,
    e,
    omega: Math.atan2(ey, ex),
    // Energy >= 0 means the object is no longer bound to the Sun
    valid: energy < 0 && e < 1,
  };
}

/** Orbital speed at radius r on an orbit of semi-major axis a. */
const visViva = (r: number, a: number) => Math.sqrt(MU * (2 / r - 1 / a));

/** Orbital period in years. */
const period = (a: number) => Math.sqrt((a * a * a * 4 * Math.PI ** 2) / MU);

/**
 * Minimum single tangential burn to raise (or lower) the apse opposite the
 * burn point out to the target radius — the classic Hohmann-style optimum.
 * Burning at periapsis is the most energy-efficient point (Oberth effect),
 * so that is the intervention window this reports.
 */
function optimalBurn(el: Elements, rTarget: number) {
  const rp = el.a * (1 - el.e); // periapsis radius — the burn point
  const aNew = (rp + rTarget) / 2;
  const vNow = visViva(rp, el.a);
  const vNeed = visViva(rp, aNew);
  return {
    dv: vNeed - vNow,
    burnRadius: rp,
    resultingA: aNew,
  };
}

/* ============================================================
   DATA — real published orbital elements (NASA JPL SBDB)
   ============================================================ */

interface Asteroid {
  id: string;
  name: string;
  designation: string;
  a: number;
  e: number;
  omega: number;
  note: string;
}

const ASTEROIDS: Asteroid[] = [
  {
    id: "bennu",
    name: "Bennu",
    designation: "101955",
    a: 1.126,
    e: 0.2037,
    omega: 1.1,
    note: "OSIRIS-REx sample-return target",
  },
  {
    id: "ryugu",
    name: "Ryugu",
    designation: "162173",
    a: 1.19,
    e: 0.1902,
    omega: 3.75,
    note: "Hayabusa2 sample-return target",
  },
  {
    id: "itokawa",
    name: "Itokawa",
    designation: "25143",
    a: 1.324,
    e: 0.2801,
    omega: 2.44,
    note: "Hayabusa sample-return target",
  },
  {
    id: "eros",
    name: "Eros",
    designation: "433",
    a: 1.458,
    e: 0.2226,
    omega: 3.09,
    note: "Largest near-Earth asteroid",
  },
  {
    id: "ganymed",
    name: "Ganymed",
    designation: "1036",
    a: 2.665,
    e: 0.533,
    omega: 2.44,
    note: "Highly eccentric, Mars-crossing",
  },
];

const TARGETS = [
  { id: "earth", label: "Earth", a: 1.0, color: "#5c9ead" },
  { id: "moon", label: "Moon", a: 1.0, color: "#9aa3ad" },
  { id: "mars", label: "Mars", a: 1.5237, color: "#c1663f" },
] as const;

/* ============================================================
   COMPONENT
   ============================================================ */

export default function OrbitSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  const [asteroidId, setAsteroidId] = useState("bennu");
  const [targetId, setTargetId] = useState<string>("earth");
  const [dvKmS, setDvKmS] = useState(0);
  const [burnNuDeg, setBurnNuDeg] = useState(0);
  const [playing, setPlaying] = useState(true);

  const asteroid = useMemo(
    () => ASTEROIDS.find((a) => a.id === asteroidId)!,
    [asteroidId],
  );
  const target = useMemo(
    () => TARGETS.find((t) => t.id === targetId)!,
    [targetId],
  );

  const original: Elements = useMemo(
    () => ({ a: asteroid.a, e: asteroid.e, omega: asteroid.omega }),
    [asteroid],
  );

  /* --- Apply the burn and derive the resulting orbit ------------------ */
  const result = useMemo(() => {
    const nu = (burnNuDeg * Math.PI) / 180;
    const st = stateFromElements(original, nu);

    // Prograde (tangential) impulse
    const speed = Math.hypot(st.v[0], st.v[1]);
    const dv = dvKmS / AU_YR_TO_KM_S;
    const ux = st.v[0] / speed;
    const uy = st.v[1] / speed;

    const newState: State = {
      r: st.r,
      v: [st.v[0] + ux * dv, st.v[1] + uy * dv],
    };

    const el = elementsFromState(newState);
    return { elements: el, burnPoint: st.r, preSpeed: speed };
  }, [original, burnNuDeg, dvKmS]);

  const optimal = useMemo(
    () => optimalBurn(original, target.a),
    [original, target.a],
  );

  const newEl = result.elements;
  const perihelion = newEl.a * (1 - newEl.e);
  const aphelion = newEl.a * (1 + newEl.e);

  /** Does the resulting orbit actually reach the target's orbital radius? */
  const intersects =
    newEl.valid && perihelion <= target.a + 0.03 && aphelion >= target.a - 0.03;

  /* --- Rendering ------------------------------------------------------ */
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      const cx = w / 2;
      const cy = h / 2;

      // Scale so the largest relevant orbit fits with margin
      const maxR = Math.max(
        newEl.valid ? aphelion : original.a * (1 + original.e),
        original.a * (1 + original.e),
        target.a,
        1.6,
      );
      const scale = (Math.min(w, h) / 2 - 34) / maxR;

      const toPx = (x: number, y: number): [number, number] => [
        cx + x * scale,
        cy - y * scale,
      ];

      ctx.clearRect(0, 0, w, h);

      // --- Background grid ---
      ctx.strokeStyle = "rgba(38,43,49,0.55)";
      ctx.lineWidth = 1;
      const step = 34;
      ctx.beginPath();
      for (let x = cx % step; x < w; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = cy % step; y < h; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // --- Distance rings ---
      ctx.strokeStyle = "rgba(38,43,49,0.9)";
      ctx.setLineDash([2, 5]);
      [1, 2, 3].forEach((au) => {
        if (au > maxR) return;
        ctx.beginPath();
        ctx.arc(cx, cy, au * scale, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // --- Helper to stroke an ellipse from elements ---
      const strokeOrbit = (
        el: Elements,
        color: string,
        width: number,
        dash: number[],
        alpha = 1,
      ) => {
        const p = el.a * (1 - el.e * el.e);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.setLineDash(dash);
        ctx.beginPath();
        for (let i = 0; i <= 240; i++) {
          const nu = (i / 240) * Math.PI * 2;
          const r = p / (1 + el.e * Math.cos(nu));
          const xP = r * Math.cos(nu);
          const yP = r * Math.sin(nu);
          const c = Math.cos(el.omega);
          const s = Math.sin(el.omega);
          const [px, py] = toPx(xP * c - yP * s, xP * s + yP * c);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.restore();
        ctx.setLineDash([]);
      };

      // --- Target planet orbit (circular approximation) ---
      ctx.save();
      ctx.strokeStyle = target.color;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.arc(cx, cy, target.a * scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Target body, moving
      const tAng = t * (2 * Math.PI) / period(target.a);
      const [tx, ty] = toPx(
        Math.cos(tAng) * target.a,
        Math.sin(tAng) * target.a,
      );
      ctx.fillStyle = target.color;
      ctx.beginPath();
      ctx.arc(tx, ty, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // --- Original orbit ---
      strokeOrbit(original, "#6b747e", 1.25, [4, 4], 0.85);

      // --- Resulting orbit ---
      if (newEl.valid) {
        if (dvKmS !== 0) strokeOrbit(newEl, "#ff6b35", 1.9, [], 1);
      } else {
        // Escape trajectory — draw an outbound ray as an indication
        ctx.save();
        ctx.strokeStyle = "#d94f1d";
        ctx.lineWidth = 1.9;
        ctx.setLineDash([6, 4]);
        const [bx, by] = toPx(result.burnPoint[0], result.burnPoint[1]);
        const ang = Math.atan2(result.burnPoint[1], result.burnPoint[0]);
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(
          bx + Math.cos(ang) * w,
          by - Math.sin(ang) * w,
        );
        ctx.stroke();
        ctx.restore();
        ctx.setLineDash([]);
      }

      // --- Sun ---
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22);
      grad.addColorStop(0, "rgba(255,180,80,0.85)");
      grad.addColorStop(1, "rgba(255,140,40,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffcf6b";
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // --- Burn point marker ---
      const [bx, by] = toPx(result.burnPoint[0], result.burnPoint[1]);
      ctx.strokeStyle = dvKmS !== 0 ? "#ff6b35" : "#6b747e";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(bx, by, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(bx - 11, by);
      ctx.lineTo(bx - 4, by);
      ctx.moveTo(bx + 4, by);
      ctx.lineTo(bx + 11, by);
      ctx.moveTo(bx, by - 11);
      ctx.lineTo(bx, by - 4);
      ctx.moveTo(bx, by + 4);
      ctx.lineTo(bx, by + 11);
      ctx.stroke();

      // --- Asteroid, propagated along the resulting orbit ---
      const el = newEl.valid ? newEl : original;
      const P = period(el.a);
      const M = ((t / P) * 2 * Math.PI) % (Math.PI * 2);

      // Solve Kepler's equation M = E - e sin E by Newton-Raphson
      let E = M;
      for (let i = 0; i < 6; i++) {
        E = E - (E - el.e * Math.sin(E) - M) / (1 - el.e * Math.cos(E));
      }
      const nu =
        2 *
        Math.atan2(
          Math.sqrt(1 + el.e) * Math.sin(E / 2),
          Math.sqrt(1 - el.e) * Math.cos(E / 2),
        );
      const rr = el.a * (1 - el.e * Math.cos(E));
      const xP = rr * Math.cos(nu);
      const yP = rr * Math.sin(nu);
      const co = Math.cos(el.omega);
      const so = Math.sin(el.omega);
      const [ax, ay] = toPx(xP * co - yP * so, xP * so + yP * co);

      ctx.fillStyle = "#e8eaed";
      ctx.beginPath();
      ctx.arc(ax, ay, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(232,234,237,0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(ax, ay, 8, 0, Math.PI * 2);
      ctx.stroke();
    },
    [original, newEl, aphelion, target, dvKmS, result.burnPoint],
  );

  /* --- Animation loop ------------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let last = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(ctx, rect.width, rect.height, tRef.current);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (playing && !reduced) tRef.current += dt * 0.35;

      const rect = canvas.getBoundingClientRect();
      draw(ctx, rect.width, rect.height, tRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [draw, playing]);

  /* --- Readout rows --------------------------------------------------- */
  const readout: [string, string, boolean?][] = [
    ["Semi-major axis", newEl.valid ? `${newEl.a.toFixed(3)} AU` : "—"],
    ["Eccentricity", newEl.valid ? newEl.e.toFixed(4) : "—"],
    ["Perihelion", newEl.valid ? `${perihelion.toFixed(3)} AU` : "—"],
    ["Aphelion", newEl.valid ? `${aphelion.toFixed(3)} AU` : "—"],
    ["Period", newEl.valid ? `${period(newEl.a).toFixed(2)} yr` : "—"],
    [
      `Reaches ${target.label}`,
      newEl.valid ? (intersects ? "YES" : "no") : "escape",
      newEl.valid && intersects,
    ],
  ];

  return (
    <div className="grid gap-px bg-line lg:grid-cols-5">
      {/* ---------- Viewport ---------- */}
      <div className="relative bg-base lg:col-span-3 aspect-square lg:aspect-auto lg:min-h-[520px]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-label={`Orbit diagram for asteroid ${asteroid.name} with a ${dvKmS.toFixed(2)} kilometre per second prograde burn`}
          role="img"
        />

        {/* Legend */}
        <div className="absolute left-4 bottom-4 flex flex-col gap-1.5 pointer-events-none">
          {[
            ["#6b747e", "Original orbit"],
            ["#ff6b35", "After burn"],
            [target.color, `${target.label} orbit`],
          ].map(([c, label]) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="block w-4 h-px"
                style={{ backgroundColor: c as string }}
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-dim">
                {label}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="absolute right-4 bottom-4 font-mono text-[9px] uppercase tracking-[0.16em] text-dim hover:text-accent border border-line px-2.5 py-1.5 transition-colors"
        >
          {playing ? "Pause" : "Play"}
        </button>

        <p className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
          {asteroid.designation} {asteroid.name}
        </p>
      </div>

      {/* ---------- Controls ---------- */}
      <div className="bg-surface lg:col-span-2 p-6 lg:p-7 flex flex-col gap-6">
        {/* Asteroid */}
        <div>
          <label
            htmlFor="sim-asteroid"
            className="mono-label block mb-2.5"
          >
            Candidate asteroid
          </label>
          <select
            id="sim-asteroid"
            value={asteroidId}
            onChange={(e) => setAsteroidId(e.target.value)}
            className="w-full bg-raised border border-line px-3 py-2.5 font-mono text-xs text-ink focus:border-accent outline-none"
          >
            {ASTEROIDS.map((a) => (
              <option key={a.id} value={a.id}>
                ({a.designation}) {a.name} — a={a.a} AU, e={a.e}
              </option>
            ))}
          </select>
          <p className="mt-2 text-[11px] text-dim leading-relaxed">
            {asteroid.note}. Elements from the NASA JPL Small-Body Database.
          </p>
        </div>

        {/* Target */}
        <div>
          <span className="mono-label block mb-2.5">Destination vicinity</span>
          <div className="flex gap-2">
            {TARGETS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTargetId(t.id)}
                className={`tag flex-1 justify-center !py-2 ${
                  targetId === t.id ? "tag-active" : ""
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Delta-V */}
        <div>
          <div className="flex items-baseline justify-between mb-2.5">
            <label htmlFor="sim-dv" className="mono-label">
              Applied ΔV (prograde)
            </label>
            <span className="font-mono text-sm text-accent tabular-nums">
              {dvKmS >= 0 ? "+" : ""}
              {dvKmS.toFixed(2)} km/s
            </span>
          </div>
          <input
            id="sim-dv"
            type="range"
            min={-3}
            max={6}
            step={0.01}
            value={dvKmS}
            onChange={(e) => setDvKmS(Number(e.target.value))}
            className="sim-range"
          />
        </div>

        {/* Burn point */}
        <div>
          <div className="flex items-baseline justify-between mb-2.5">
            <label htmlFor="sim-nu" className="mono-label">
              Burn point (true anomaly)
            </label>
            <span className="font-mono text-sm text-ink tabular-nums">
              {burnNuDeg}°
            </span>
          </div>
          <input
            id="sim-nu"
            type="range"
            min={0}
            max={359}
            step={1}
            value={burnNuDeg}
            onChange={(e) => setBurnNuDeg(Number(e.target.value))}
            className="sim-range"
          />
          <p className="mt-2 text-[11px] text-dim leading-relaxed">
            0° is perihelion — the most energy-efficient point to burn.
          </p>
        </div>

        {/* Readout */}
        <div className="border-t border-line pt-5">
          <p className="mono-label mb-3">Resulting orbit</p>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
            {readout.map(([k, v, good]) => (
              <div key={k} className="contents">
                <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim self-center">
                  {k}
                </dt>
                <dd
                  className={`font-mono text-xs tabular-nums text-right ${
                    good ? "text-signal" : "text-ink"
                  }`}
                >
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Optimal solution */}
        <div className="border border-accent/30 bg-accent/[0.06] p-4">
          <p className="mono-label !text-accent mb-2">
            Optimal single-burn solution
          </p>
          <p className="font-mono text-lg text-accent tabular-nums">
            {(optimal.dv * AU_YR_TO_KM_S >= 0 ? "+" : "") +
              (optimal.dv * AU_YR_TO_KM_S).toFixed(3)}{" "}
            km/s
          </p>
          <p className="mt-2 text-[11px] text-muted leading-relaxed">
            Minimum ΔV to raise the apse opposite periapsis out to{" "}
            {target.a.toFixed(3)} AU, applied at perihelion (
            {optimal.burnRadius.toFixed(3)} AU). Set the burn point to 0° and
            the slider to this value to fly it.
          </p>
          <button
            type="button"
            onClick={() => {
              setBurnNuDeg(0);
              setDvKmS(
                Number((optimal.dv * AU_YR_TO_KM_S).toFixed(2)),
              );
            }}
            className="btn btn-ghost mt-3 w-full !py-2 !text-[10px]"
          >
            Apply optimal burn
          </button>
        </div>
      </div>

      <style>{`
        .sim-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 2px;
          background: var(--color-line-bright);
          outline: none;
          cursor: pointer;
        }
        .sim-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          background: var(--color-accent);
          border: 2px solid var(--color-base);
          cursor: pointer;
        }
        .sim-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: var(--color-accent);
          border: 2px solid var(--color-base);
          border-radius: 0;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
