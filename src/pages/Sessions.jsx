import { gc } from "../utils.js";
import { useApp } from "../store.jsx";

export default function Sessions() {
  const { S, t, cn, sx, openSession, markDone, resetDemo } = useApp();
  return (
    <>
      <h2>{t("sessions")}</h2>
      <p className="mu">
        Saved in this browser. <button className="btn sm s" onClick={resetDemo}>Reset demo data</button>
      </p>
      <div className="sc">
        <table>
          <thead>
            <tr><th>Learner</th><th>Career</th><th>District</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {[...S.sessions].reverse().map((s) => (
              <tr key={s.id}>
                <td>{s.name}{s.seed ? "" : " (yours)"}</td>
                <td>{cn(gc(s.career))}</td>
                <td>{s.district}</td>
                <td><span className={`st ${s.status === "done" ? "done" : ""}`}>{sx(s.status)}</span></td>
                <td>
                  <a className="btn sm" href="#/chat" onClick={() => openSession(s.id)}>Resume</a>{" "}
                  <a className="btn sm s" href="#/plan" onClick={() => openSession(s.id)}>Plan</a>
                  {s.status !== "done" && (
                    <>{" "}<button className="btn sm s" onClick={() => markDone(s.id)}>Mark complete</button></>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
