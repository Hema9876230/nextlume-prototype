import { C } from "../data.js";
import { f } from "../utils.js";
import { useApp } from "../store.jsx";

const FIELDS = [
  ["c", "Training cost (₹)"],
  ["tr", "Travel expenses (₹)"],
  ["o", "Other expenses (₹)"],
  ["inc", "Expected monthly income (₹)"],
  ["dl", "Placement delay (months)"],
];

const num = (v) => Math.max(0, Number(v) || 0);

function Result({ RI }) {
  const inv = num(RI.c) + num(RI.tr) + num(RI.o);
  const inc = num(RI.inc);
  const dl = num(RI.dl);
  const pb = inc > 0 ? inv / inc + dl : null;
  const W = [6, 12, 18, 24].map((m) => ({ m, v: Math.max(0, m - dl) * inc }));
  const mx = Math.max(inv, ...W.map((w) => w.v), 1);

  return (
    <>
      <div className="k">₹{f(inv)}</div>
      <div className="mu">Total training investment</div>
      <p>
        Monthly income: <b>₹{f(inc)}</b> · Annual income: <b>₹{f(inc * 12)}</b>
        <br />
        Payback: <b>{pb == null ? "Not computable (income is zero)" : pb.toFixed(1) + " months from course start"}</b>
      </p>
      <svg viewBox="0 0 320 150" width="100%" role="img" aria-label="Cost versus cumulative income">
        <line x1="10" y1="120" x2="310" y2="120" stroke="currentColor" opacity=".3" />
        <rect x="14" y={120 - (inv / mx) * 100} width="40" height={(inv / mx) * 100} fill="#b45309" />
        <text x="14" y="138" fontSize="9" fill="currentColor">Cost</text>
        {W.map((w, i) => (
          <g key={w.m}>
            <rect x={76 + i * 60} y={120 - (w.v / mx) * 100} width="40" height={(w.v / mx) * 100} fill="#0f766e" />
            <text x={76 + i * 60} y="138" fontSize="9" fill="currentColor">{w.m} mo</text>
          </g>
        ))}
      </svg>
      <p className="mu">
        Formula: payback = investment ÷ monthly income + placement delay. Illustrative estimate only; it is not a
        guarantee of employment, salary or return.
      </p>
    </>
  );
}

export default function Roi() {
  const { t, cn, RI, setRI } = useApp();

  const prefill = (id) => {
    if (!id) return;
    const c = C.find((x) => x.id == id);
    setRI({ c: c.c, tr: 2000, o: 1000, inc: Math.round((c.s[0] + c.s[1]) / 2), dl: 2 });
  };

  return (
    <>
      <h2>{t("roi")} calculator</h2>
      <div className="g g2">
        <div className="c">
          <label htmlFor="rc">Prefill from career</label>
          <select id="rc" value="" onChange={(e) => prefill(e.target.value)}>
            <option value="">Choose…</option>
            {C.map((c) => <option key={c.id} value={c.id}>{cn(c)}</option>)}
          </select>
          {FIELDS.map(([k, label]) => (
            <div key={k}>
              <label htmlFor={"r_" + k}>{label}</label>
              <input
                id={"r_" + k}
                type="number"
                min="0"
                value={RI[k]}
                onChange={(e) => setRI((r) => ({ ...r, [k]: e.target.value }))}
              />
            </div>
          ))}
        </div>
        <div className="c"><Result RI={RI} /></div>
      </div>
    </>
  );
}
