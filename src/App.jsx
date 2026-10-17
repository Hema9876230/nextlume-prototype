import { useEffect, useState } from "react";
import { NAV_KEYS } from "./data.js";
import { useApp } from "./store.jsx";
import Home from "./pages/Home.jsx";
import Start from "./pages/Start.jsx";
import Explore from "./pages/Explore.jsx";
import Career from "./pages/Career.jsx";
import Chat from "./pages/Chat.jsx";
import Compare from "./pages/Compare.jsx";
import Roi from "./pages/Roi.jsx";
import Plan from "./pages/Plan.jsx";
import Sessions from "./pages/Sessions.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const ROUTES = {
  "": "home",
  start: "start",
  explore: "explore",
  career: "career",
  chat: "chat",
  compare: "compare",
  roi: "roi",
  plan: "plan",
  sessions: "sessions",
  dash: "dash",
};

const PAGES = {
  home: Home,
  start: Start,
  explore: Explore,
  career: Career,
  chat: Chat,
  compare: Compare,
  roi: Roi,
  plan: Plan,
  sessions: Sessions,
  dash: Dashboard,
};

/** Tiny hash router: #/career/3 -> { key: "career", arg: "3" } */
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  const [name = "", arg] = (hash || "#/").slice(2).split("/");
  return { key: ROUTES[name] || "home", arg };
}

export default function App() {
  const { t, toggleLang } = useApp();
  const { key, arg } = useHashRoute();
  const Page = PAGES[key];

  return (
    <>
      <header>
        <div className="hw">
          <a className="brand" href="#/">💡 NextLume</a>
          <nav aria-label="Main">
            {NAV_KEYS.map((x) => (
              <a key={x} href={`#/${x}`} className={key === x ? "on" : ""}>
                {t(x)}
              </a>
            ))}
          </nav>
          <button className="lang" onClick={toggleLang} aria-label="Switch language">
            हि / EN
          </button>
        </div>
      </header>
      <div className="note" role="note">{t("note")}</div>
      <main tabIndex={-1}>
        <Page arg={arg} />
      </main>
      <footer>
        Smart India Hackathon 2026 · PS 26241 · Team Innovent · Smart Education (MSDE)
        <br />
        Figures are illustrative estimates, not verified statistics or guarantees.
      </footer>
    </>
  );
}
