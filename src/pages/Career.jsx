import { f, gc, navigate } from "../utils.js";
import { useApp } from "../store.jsx";

export default function Career({ arg }) {
  const { cn, setRI, addToCompare } = useApp();
  const c = gc(arg);

  const openRoi = () => {
    setRI({ c: c.c, tr: 2000, o: 1000, inc: Math.round((c.s[0] + c.s[1]) / 2), dl: 2 });
    navigate("/roi");
  };

  return (
    <>
      <p><a href="#/explore">← All careers</a></p>
      <div className="c">
        <h1>{cn(c)}</h1>
        <p>{c.d}</p>
        <div className="g g2">
          <div>
            <h3>Training</h3>
            <p>{c.m} months · ₹{f(c.c)} (illustrative) · {c.q}</p>
            <h3>Illustrative salary</h3>
            <p>₹{f(c.s[0])} to ₹{f(c.s[1])} per month</p>
            <h3>Skills</h3>
            {c.sk.map((x) => <span className="tag" key={x}>{x}</span>)}
            <h3>Example roles</h3>
            {c.r.map((x) => <span className="tag" key={x}>{x}</span>)}
          </div>
          <div>
            <h3>Safety considerations</h3>
            <p>{c.sf}</p>
            <h3>Progression</h3>
            <p>{c.p}</p>
            <h3>Location</h3>
            <p>{c.km}</p>
          </div>
        </div>
        <div className="row">
          <button className="btn" onClick={openRoi}>Use in ROI calculator</button>
          <button
            className="btn s"
            onClick={() => {
              addToCompare(c.id);
              navigate("/compare");
            }}
          >
            Add to comparison
          </button>
        </div>
      </div>
    </>
  );
}
