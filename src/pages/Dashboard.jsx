import { C, D } from "../data.js";
import { cnt, f, gc } from "../utils.js";
import { useApp } from "../store.jsx";

function Bars({ data }) {
  const entries = Object.entries(data);
  if (!entries.length) return <p className="mu">No matching records.</p>;
  const max = Math.max(1, ...Object.values(data));
  return entries.map(([k, v]) => (
    <div className="br" key={k}>
      <span>{k}</span>
      <div><i style={{ width: `${(v / max) * 100}%` }} /></div>
      <b>{v}</b>
    </div>
  ));
}

const budgetBucket = (b) =>
  b < 10000 ? "Under ₹10k" : b < 20000 ? "₹10k to 20k" : b < 30000 ? "₹20k to 30k" : "₹30k+";

const avg = (a) => (a.length ? (a.reduce((x, y) => x + y, 0) / a.length).toFixed(1) : "–");

export default function Dashboard() {
  const { S, t, cn, cl, sx, filters: F, setFilters, dashTab: tab, setDashTab, detailId, setDetailId, openSession } = useApp();

  const setF = (k) => (e) => setFilters((x) => ({ ...x, [k]: e.target.value }));

  const L = S.sessions.filter(
    (s) =>
      (!F.q || (s.name + s.district + gc(s.career).n).toLowerCase().includes(F.q.toLowerCase())) &&
      (!F.st || s.status === F.st) &&
      (!F.ca || s.career == F.ca) &&
      (!F.di || s.district === F.di) &&
      (F.dt === "0" || s.days <= +F.dt)
  );

  const n = (st) => L.filter((s) => s.status === st).length;
  const done = L.filter((s) => s.status === "done");
  const byCareer = cnt(L, (s) => cn(gc(s.career)));
  const byConcern = cnt(L.flatMap((s) => s.concerns), cl);
  const byBudget = cnt(L, (s) => budgetBucket(s.budget));
  const byDistrict = cnt(L, (s) => s.district.split(",")[0]);
  const byStatus = cnt(L, (s) => sx(s.status));
  const recent = [...L].sort((a, b) => a.days - b.days);
  const d = S.sessions.find((s) => s.id === detailId);

  return (
    <>
      <h2>{t("dash")}</h2>
      <p className="mu">Demo access (no real authentication). All records are synthetic demonstration data.</p>

      <div className="row np">
        <button className={`btn sm ${tab === "c" ? "" : "s"}`} onClick={() => setDashTab("c")}>Counsellor</button>
        <button className={`btn sm ${tab === "a" ? "" : "s"}`} onClick={() => setDashTab("a")}>Admin</button>
      </div>

      <div className="row np" style={{ margin: "10px 0" }}>
        <input placeholder="Search" value={F.q} onChange={setF("q")} aria-label="Search" style={{ maxWidth: 180 }} />
        <select value={F.st} onChange={setF("st")} aria-label="Status">
          <option value="">All status</option>
          {["active", "done", "escalated"].map((x) => <option key={x} value={x}>{sx(x)}</option>)}
        </select>
        <select value={F.ca} onChange={setF("ca")} aria-label="Career">
          <option value="">All careers</option>
          {C.map((c) => <option key={c.id} value={c.id}>{cn(c)}</option>)}
        </select>
        <select value={F.di} onChange={setF("di")} aria-label="District">
          <option value="">All districts</option>
          {D.map((x) => <option key={x}>{x}</option>)}
        </select>
        <select value={F.dt} onChange={setF("dt")} aria-label="Date">
          <option value="0">Any date</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </select>
      </div>

      <div className="g g3">
        <div className="c"><div className="k">{L.length}</div>Total sessions</div>
        <div className="c"><div className="k">{n("active")}</div>Active</div>
        <div className="c"><div className="k">{n("done")}</div>Completed</div>
        <div className="c">
          <div className="k">{avg(done.map((s) => s.cb))} → {avg(done.map((s) => s.ca))}</div>
          Avg confidence (1 to 5), completed
        </div>
      </div>

      {tab === "a" ? (
        <div className="g g2" style={{ marginTop: 14 }}>
          <div className="c"><h3>Career preference</h3><Bars data={byCareer} /></div>
          <div className="c"><h3>Common concerns</h3><Bars data={byConcern} /></div>
          <div className="c"><h3>Training budget</h3><Bars data={byBudget} /></div>
          <div className="c"><h3>District interest</h3><Bars data={byDistrict} /></div>
          <div className="c"><h3>Session status</h3><Bars data={byStatus} /></div>
          <div className="c">
            <h3>Recent activity</h3>
            {recent.length ? (
              recent.slice(0, 6).map((s) => (
                <div className="mu" key={s.id}>
                  {s.name} · {sx(s.status)} · {s.days ? s.days + " days ago" : "today"}
                </div>
              ))
            ) : (
              "No activity."
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="g g2" style={{ marginTop: 14 }}>
            <div className="c sc">
              <h3>Recent sessions</h3>
              {recent.length ? (
                <table>
                  <tbody>
                    {recent.map((s) => (
                      <tr key={s.id}>
                        <td><button className="btn sm s" onClick={() => setDetailId(s.id)}>{s.name}</button></td>
                        <td>{cn(gc(s.career))}</td>
                        <td><span className={`st ${s.status === "done" ? "done" : ""}`}>{sx(s.status)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mu">No sessions match these filters.</p>
              )}
            </div>

            <div className="c">
              <h3>Session detail</h3>
              {d ? (
                <>
                  <p>
                    <b>{d.name}</b>, {d.age}, {d.edu}
                    <br />
                    {cn(gc(d.career))} · {d.district} · ₹{f(d.budget)}
                    <br />
                    Concern: {d.concerns.map(cl).join(", ")}
                    <br />
                    Confidence: {d.cb} → {d.ca}
                  </p>
                  <h3>Recommended next actions</h3>
                  <ul>
                    {d.status === "escalated" && <li>Arrange a human counsellor call (with family consent)</li>}
                    <li>Share the {cl(d.concerns[0])} evidence summary with the family</li>
                    <li>Schedule a centre visit within 2 weeks</li>
                    <li>Follow up on enrolment in 30 days</li>
                  </ul>
                  <a className="btn sm" href="#/plan" onClick={() => openSession(d.id)}>View plan</a>
                </>
              ) : (
                <p className="mu">Select a session to see its profile and summary.</p>
              )}
            </div>
          </div>

          <div className="c" style={{ marginTop: 14 }}>
            <h3>Top careers</h3>
            <Bars data={byCareer} />
            <h3>Common concerns</h3>
            <Bars data={byConcern} />
          </div>
        </>
      )}
    </>
  );
}
