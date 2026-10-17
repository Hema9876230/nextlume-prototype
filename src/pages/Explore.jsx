import { C } from "../data.js";
import { f, navigate } from "../utils.js";
import { useApp } from "../store.jsx";

export default function Explore() {
  const { t, cn, explore, setExplore, addToCompare } = useApp();
  const { q, so } = explore;

  const list = C.filter((c) => (c.n + c.d + c.sk.join() + c.r.join()).toLowerCase().includes(q.toLowerCase())).sort(
    (a, b) =>
      so === "n" ? a.n.localeCompare(b.n) : so === "c" ? a.c - b.c : so === "m" ? a.m - b.m : b.s[1] - a.s[1]
  );

  return (
    <>
      <h2>{t("explore")}</h2>
      <div className="row np">
        <input
          id="exq"
          placeholder="Search careers, skills, roles"
          value={q}
          onChange={(e) => setExplore((x) => ({ ...x, q: e.target.value }))}
          aria-label="Search"
          style={{ maxWidth: 300 }}
        />
        <select id="exs" value={so} onChange={(e) => setExplore((x) => ({ ...x, so: e.target.value }))} aria-label="Sort">
          <option value="n">Sort: name</option>
          <option value="c">Lowest cost</option>
          <option value="m">Shortest</option>
          <option value="s">Highest salary</option>
        </select>
      </div>
      <p className="mu">All costs and salaries are illustrative estimates, not verified statistics.</p>
      <div className="g g2">
        {list.length ? (
          list.map((c) => (
            <div className="c" key={c.id}>
              <h3>{cn(c)}</h3>
              <p className="mu">{c.d}</p>
              <p>
                ⏱ {c.m} months · ₹{f(c.c)} · {c.q}
                <br />
                💰 ₹{f(c.s[0])} to ₹{f(c.s[1])}/month
              </p>
              <a className="btn sm" href={`#/career/${c.id}`}>Details</a>{" "}
              <button
                className="btn sm s"
                onClick={() => {
                  addToCompare(c.id);
                  navigate("/compare");
                }}
              >
                Compare
              </button>
            </div>
          ))
        ) : (
          <div className="c">No careers match your search. Clear the search box to see all eight.</div>
        )}
      </div>
    </>
  );
}
