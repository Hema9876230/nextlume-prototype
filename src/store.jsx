import { createContext, useContext, useEffect, useState } from "react";
import { CN, SX, T, newDraft, seedState } from "./data.js";
import { greeting, reply } from "./utils.js";

const STORAGE_KEY = "nl_v2";
const AppContext = createContext(null);

export const useApp = () => {
  const v = useContext(AppContext);
  if (!v) throw new Error("useApp must be used inside <AppProvider>");
  return v;
};

function loadState() {
  try {
    const x = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (x && Array.isArray(x.sessions) && x.sessions.length) {
      return { plan: {}, msgs: {}, lang: "en", ...x };
    }
  } catch {
    /* ignore corrupt or unavailable storage */
  }
  return seedState();
}

export function AppProvider({ children }) {
  /* ---- persisted state (sessions, chat messages, plan checklists, language) ---- */
  const [S, setS] = useState(loadState);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(S));
    } catch {
      /* storage may be unavailable */
    }
  }, [S]);

  /* ---- UI state kept across page changes (not persisted) ---- */
  const [cmp, setCmp] = useState([1, 3]);
  const [RI, setRI] = useState({ c: 12000, tr: 2000, o: 1000, inc: 15000, dl: 2 });
  const [role, setRole] = useState("family");
  const [explore, setExplore] = useState({ q: "", so: "n" });
  const [filters, setFilters] = useState({ q: "", st: "", ca: "", di: "", dt: "0" });
  const [dashTab, setDashTab] = useState("c");
  const [detailId, setDetailId] = useState(null);
  const [wizard, setWizard] = useState({ step: 0, draft: newDraft() });

  /* ---- language ---- */
  const lang = S.lang;
  const idx = lang === "hi" ? 1 : 0;
  const t = (k) => T[k][idx];
  const cn = (c) => (lang === "hi" ? c.h : c.n);
  const cl = (k) => CN[k][idx];
  const sx = (st) => SX[st][idx];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const session = S.sessions.find((s) => s.id == S.cur) || S.sessions[0];

  /* ---- actions ---- */
  const toggleLang = () => setS((p) => ({ ...p, lang: p.lang === "en" ? "hi" : "en" }));
  const setLang = (l) => setS((p) => ({ ...p, lang: l }));

  const addSession = (d) => {
    const id = Math.max(0, ...S.sessions.map((s) => s.id)) + 1;
    const created = {
      id,
      name: d.name,
      age: +d.age,
      edu: d.edu,
      career: +d.career,
      district: d.district,
      budget: +d.budget,
      concerns: d.concerns,
      status: "active",
      cb: 2.5,
      ca: 2.5,
      days: 0,
    };
    setS((p) => ({ ...p, sessions: [...p.sessions, created], cur: id }));
    return id;
  };

  const openSession = (id) => setS((p) => ({ ...p, cur: +id }));

  /** returns true if the message was sent */
  const sendMessage = (text) => {
    const s = session;
    if (s.status === "done") {
      alert("This session is complete. Start a new family session to continue counselling.");
      return false;
    }
    setS((p) => {
      const base = p.msgs[s.id] || [greeting(s, p.lang)];
      return {
        ...p,
        msgs: {
          ...p.msgs,
          [s.id]: [
            ...base,
            { r: role === "family" ? "f" : "l", t: text },
            { r: "a", t: reply(text, s, p.lang) },
          ],
        },
      };
    });
    return true;
  };

  const completeSession = (id, boost) =>
    setS((p) => ({
      ...p,
      sessions: p.sessions.map((x) =>
        x.id == id ? { ...x, status: "done", ca: Math.min(5, +(x.cb + boost).toFixed(1)) } : x
      ),
    }));
  const finishSession = () => completeSession(session.id, 1.1);
  const markDone = (id) => completeSession(id, 1);

  const toggleCheck = (sid, key, val) =>
    setS((p) => ({
      ...p,
      plan: { ...p.plan, [sid]: { ...(p.plan[sid] || {}), [key]: val } },
    }));

  const resetDemo = () => {
    if (!confirm("Clear all demo data in this browser and restore the original sample records?")) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setS((p) => ({ ...seedState(), lang: p.lang }));
    setDetailId(null);
  };

  const toggleCompare = (id) =>
    setCmp((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const addToCompare = (id) => setCmp((c) => (c.includes(id) ? c : [...c, id]));

  const value = {
    S, lang, session, t, cn, cl, sx,
    toggleLang, setLang,
    addSession, openSession, sendMessage, finishSession, markDone, toggleCheck, resetDemo,
    cmp, toggleCompare, addToCompare,
    RI, setRI,
    role, setRole,
    explore, setExplore,
    filters, setFilters,
    dashTab, setDashTab,
    detailId, setDetailId,
    wizard, setWizard,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
