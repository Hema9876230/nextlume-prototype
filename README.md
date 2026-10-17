# NextLume – SIH 2026 prototype (React)

React + Vite port of the NextLume single-file prototype. No extra runtime
dependencies beyond `react` and `react-dom`.

## Run

```bash
npm install        # resolves the latest react, react-dom, vite, @vitejs/plugin-react
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

Node 20.19+ (or 22.12+) is required by current Vite.

Tip: after the first `npm install`, run `npm pkg set` or edit `package.json`
to replace `"latest"` with the resolved versions if you want reproducible builds
(`package-lock.json` already pins them).

## Structure

```
src/
  main.jsx        entry
  App.jsx         layout, header, hash router
  store.jsx       AppProvider: persisted state (localStorage "nl_v2"), UI state, actions, i18n helpers
  data.js         careers, districts, concerns, translations, seed sessions, chat engine text
  utils.js        formatting, reply engine, action-plan builder
  index.css       styles (light/dark, print)
  pages/          Home, Start, Explore, Career, Chat, Compare, Roi, Plan, Sessions, Dashboard
```

Routing is hash based (`#/start`, `#/career/3`, ...) so it works on any static host.
All data is synthetic demo data and nothing leaves the browser.
