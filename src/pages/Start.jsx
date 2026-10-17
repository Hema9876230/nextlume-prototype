import { useState } from "react";
import { C, CN, D, EDU, PREFS, newDraft } from "../data.js";
import { f, gc, navigate } from "../utils.js";
import { useApp } from "../store.jsx";

function Field({ id, label, error, value, onChange, type = "text", ...rest }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
      <div className="err" id={"e_" + id}>{error}</div>
    </>
  );
}

function validate(step, x) {
  const e = {};
  if (step === 0) {
    if (!x.name.trim()) e.name = "Enter a name";
    const a = +x.age;
    if (!a || a < 14 || a > 60) e.age = "Enter an age from 14 to 60";
  }
  if (step === 1) {
    if (x.budget === "" || x.budget == null || +x.budget < 0) e.budget = "Enter a budget of 0 or more";
  }
  if (step === 2 && !x.concerns.length) e.cc = "Choose at least one concern";
  return e;
}

export default function Start() {
  const { t, cn, cl, lang, setLang, wizard, setWizard, addSession } = useApp();
  const { step, draft: x } = wizard;
  const [errors, setErrors] = useState({});

  const upd = (patch) => setWizard((w) => ({ ...w, draft: { ...w.draft, ...patch } }));
  const toggleConcern = (k) =>
    upd({ concerns: x.concerns.includes(k) ? x.concerns.filter((c) => c !== k) : [...x.concerns, k] });

  const prev = () => {
    setErrors({});
    setWizard((w) => ({ ...w, step: w.step - 1 }));
  };

  const next = () => {
    const e = validate(step, x);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (step < 3) {
      setWizard((w) => ({ ...w, step: w.step + 1 }));
      return;
    }
    addSession({ ...x, name: x.name.trim() });
    setWizard({ step: 0, draft: newDraft() });
    navigate("/chat");
  };

  const pages = [
    <>
      <Field id="name" label="Learner name" value={x.name} error={errors.name} onChange={(v) => upd({ name: v })} />
      <Field id="age" label="Age (14 to 60)" type="number" min="14" max="60" value={x.age} error={errors.age} onChange={(v) => upd({ age: v })} />
      <label htmlFor="edu">Education level</label>
      <select id="edu" value={x.edu} onChange={(e) => upd({ edu: e.target.value })}>
        {EDU.map((o) => <option key={o}>{o}</option>)}
      </select>
      <Field id="interests" label="Interests (for example repairing things, helping people)" value={x.interests} onChange={(v) => upd({ interests: v })} />
    </>,
    <>
      <label htmlFor="career">Preferred vocational career</label>
      <select id="career" value={x.career} onChange={(e) => upd({ career: +e.target.value })}>
        {C.map((c) => <option key={c.id} value={c.id}>{cn(c)}</option>)}
      </select>
      <label htmlFor="district">Training district</label>
      <select id="district" value={x.district} onChange={(e) => upd({ district: e.target.value })}>
        {D.map((o) => <option key={o}>{o}</option>)}
      </select>
      <Field id="budget" label="Available budget for training (₹)" type="number" min="0" value={x.budget} error={errors.budget} onChange={(v) => upd({ budget: v })} />
    </>,
    <>
      <label>Family concerns (choose at least one)</label>
      <div className="chk" id="cc">
        {Object.keys(CN).map((k) => (
          <label key={k}>
            <input type="checkbox" value={k} checked={x.concerns.includes(k)} onChange={() => toggleConcern(k)} />
            {cl(k)}
          </label>
        ))}
      </div>
      <div className="err" id="e_cc">{errors.cc}</div>
      <label htmlFor="pref">Family preference</label>
      <select id="pref" value={x.pref} onChange={(e) => upd({ pref: e.target.value })}>
        {PREFS.map((o) => <option key={o}>{o}</option>)}
      </select>
      <label htmlFor="plang">Preferred language</label>
      <select id="plang" value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
    </>,
    <>
      <h3>Review</h3>
      <p>
        <b>{x.name}</b>, {x.age}, {x.edu}<br />
        Career: {cn(gc(x.career))}<br />
        District: {x.district} · Budget: ₹{f(x.budget)}<br />
        Concerns: {x.concerns.map(cl).join(", ")}<br />
        Preference: {x.pref}
      </p>
      <p className="mu">Demo only: stored in this browser. Do not enter real personal details.</p>
    </>,
  ];

  return (
    <>
      <h2>{t("start")}</h2>
      <div className="c" style={{ maxWidth: 640 }}>
        <div className="mu">Step {step + 1} of 4</div>
        <div className="pr"><i style={{ width: `${(step + 1) * 25}%` }} /></div>
        {pages[step]}
        <div className="row" style={{ marginTop: 14 }}>
          {step > 0 && <button className="btn s" onClick={prev}>Previous</button>}
          <button className="btn" onClick={next}>{step === 3 ? "Create demo session" : "Next"}</button>
        </div>
      </div>
    </>
  );
}
