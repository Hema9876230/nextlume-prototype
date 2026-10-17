import { useEffect, useRef, useState } from "react";
import { gc, greeting } from "../utils.js";
import { useApp } from "../store.jsx";

const FAMILY_CHIPS = [
  "Is it safe for my daughter?",
  "Will the salary be enough?",
  "Will there be a job?",
  "What will relatives say?",
  "It is too far from home",
  "What is the cost?",
];
const LEARNER_CHIPS = ["What will I learn?", "I like this career", "How do I talk to my parents?"];

export default function Chat() {
  const { S, lang, session: s, t, cn, cl, sx, role, setRole, sendMessage, finishSession } = useApp();
  const [text, setText] = useState("");
  const boxRef = useRef(null);
  const c = gc(s.career);
  const msgs = S.msgs[s.id] || [greeting(s, lang)];

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs.length, s.id]);

  const submit = () => {
    const v = text.trim();
    if (v && sendMessage(v)) setText("");
  };

  const label = (r) => (r === "a" ? "NextLume (simulated)" : r === "f" ? "Family" : "Learner");
  const chips = role === "family" ? FAMILY_CHIPS : LEARNER_CHIPS;

  return (
    <>
      <h2>{t("chat")}: {s.name} · {cn(c)}</h2>
      <p className="mu">
        <b>Simulated demo counsellor.</b> No real AI model is connected. Status:{" "}
        <span className={`st ${s.status === "done" ? "done" : ""}`}>{sx(s.status)}</span>
      </p>
      <div className="c">
        <div className="row np">
          <b>Speaking as:</b>
          <button className={`btn sm ${role === "family" ? "" : "s"}`} onClick={() => setRole("family")}>Family</button>
          <button className={`btn sm ${role === "learner" ? "" : "s"}`} onClick={() => setRole("learner")}>Learner</button>
          <span className="mu">{s.status === "done" ? "Session completed" : ""}</span>
        </div>

        <div className="chat" ref={boxRef} aria-live="polite">
          {msgs.map((m, i) => (
            <div className={`m ${m.r}`} key={i}>
              <b>{label(m.r)}</b>
              {m.t}
            </div>
          ))}
        </div>

        <div className="np">
          {chips.map((x) => (
            <button key={x} className="btn sm s" style={{ margin: 2 }} onClick={() => sendMessage(x)}>{x}</button>
          ))}
        </div>

        <div className="row np" style={{ marginTop: 8 }}>
          <input
            id="cin"
            placeholder="Type a message"
            aria-label="Message"
            style={{ flex: 1 }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          <button className="btn" onClick={submit}>{t("send")}</button>
          <button className="btn s" onClick={finishSession}>{t("fin")}</button>
        </div>
      </div>
    </>
  );
}
