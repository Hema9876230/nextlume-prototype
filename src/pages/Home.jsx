import { useApp } from "../store.jsx";

const STEPS = [
  ["1. Family onboarding", "Language, district, budget and the family’s biggest worry."],
  ["2. Concern analysis", "The counsellor tags salary, safety, job security, status or distance."],
  ["3. Joint counselling", "Learner and family talk, compare careers and test the numbers."],
  ["4. Shared plan", "One 30-day career action plan, saved and printable."],
];

export default function Home() {
  const { t } = useApp();
  return (
    <>
      <section className="hero">
        <h1>NextLume</h1>
        <p style={{ fontSize: 18 }}><b>{t("tag")}</b></p>
        <p>{t("intro")}</p>
        <div className="row">
          <a className="btn" href="#/start">{t("go")}</a>
          <a className="btn s" href="#/dash">{t("adm")}</a>
        </div>
        <p className="mu" style={{ color: "#d5efec" }}>Demo access: one click, no real login or security.</p>
      </section>

      <h2 style={{ marginTop: 24 }}>How it works</h2>
      <div className="g g3">
        {STEPS.map(([title, text]) => (
          <div className="c" key={title}>
            <h3>{title}</h3>
            <p className="mu">{text}</p>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 24 }}>Benefits</h2>
      <div className="g g3">
        <div className="c"><h3>For families</h3><p className="mu">Decide on evidence, not doubt alone.</p></div>
        <div className="c"><h3>For counsellors</h3><p className="mu">Start each session with the concern and summary ready.</p></div>
        <div className="c"><h3>For administrators</h3><p className="mu">See where resistance is concentrated.</p></div>
      </div>

      <p className="mu">
        Quick links: <a href="#/explore">Explore careers</a> · <a href="#/compare">Compare</a> ·{" "}
        <a href="#/roi">ROI calculator</a> · <a href="#/sessions">Past sessions</a>
      </p>
    </>
  );
}
