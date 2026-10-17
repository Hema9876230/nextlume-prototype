import { f, gc, planFor } from "../utils.js";
import { useApp } from "../store.jsx";

export default function Plan() {
  const { S, session: s, t, cn, cl, toggleCheck } = useApp();
  const c = gc(s.career);
  const p = planFor(s, cl);
  const ck = S.plan[s.id] || {};
  const all = p.W.flatMap((w, i) => w[1].map((_, j) => `${i}-${j}`));
  const dn = all.filter((id) => ck[id]).length;

  const box = (id, text) => (
    <label key={id}>
      <input type="checkbox" checked={!!ck[id]} onChange={(e) => toggleCheck(s.id, id, e.target.checked)} />
      {text}
    </label>
  );

  return (
    <>
      <h2>{t("plan")}: {s.name}</h2>
      <div className="row np">
        <button className="btn" onClick={() => window.print()}>{t("print")}</button>
        <a className="btn s" href="#/sessions">Choose another session</a>
      </div>
      <p className="mu">
        {cn(c)} · {s.district} · budget ₹{f(s.budget)}. Simulated recommendations; not an admission, placement or
        government benefit.
      </p>
      <div className="pr"><i style={{ width: `${(dn / all.length) * 100}%` }} /></div>
      <p className="mu">{dn} of {all.length} steps done</p>

      <div className="g g2">
        {p.W.map((w, i) => (
          <div className="c pl" key={w[0]}>
            <h3>{w[0]}</h3>
            {w[1].map((x, j) => box(`${i}-${j}`, x))}
          </div>
        ))}
      </div>

      <div className="g g3" style={{ marginTop: 14 }}>
        <div className="c">
          <h3>Skills to develop</h3>
          {c.sk.map((x) => <span className="tag" key={x}>{x}</span>)}
        </div>
        <div className="c">
          <h3>Documents</h3>
          <ul>{p.docs.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="c">
          <h3>Ask the provider</h3>
          <ul>{p.q.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="c pl">
          <h3>Family checklist</h3>
          {p.fam.map((x, i) => box("f" + i, x))}
        </div>
      </div>
    </>
  );
}
