import { C } from "../data.js";
import { f, gc } from "../utils.js";
import { useApp } from "../store.jsx";

function Chips() {
  const { cmp, toggleCompare, cn } = useApp();
  return (
    <div className="chk">
      {C.map((c) => (
        <label key={c.id}>
          <input type="checkbox" checked={cmp.includes(c.id)} onChange={() => toggleCompare(c.id)} />
          {cn(c)}
        </label>
      ))}
    </div>
  );
}

export default function Compare() {
  const { t, cn, cmp } = useApp();
  const L = cmp.map(gc);

  if (L.length < 2) {
    return (
      <>
        <h2>{t("compare")}</h2>
        <Chips />
        <div className="c">Select at least two careers to compare.</div>
      </>
    );
  }

  const mn = (fn) => L.reduce((a, b) => (fn(a) <= fn(b) ? a : b));
  const mx = L.reduce((a, b) => (a.s[1] >= b.s[1] ? a : b));
  const cheapest = mn((c) => c.c);
  const shortest = mn((c) => c.m);

  const rows = [
    ["Training duration", (c) => c.m + " months"],
    ["Illustrative cost", (c) => "₹" + f(c.c)],
    ["Qualification", (c) => c.q],
    ["Example roles", (c) => c.r.join(", ")],
    ["Salary range/month", (c) => "₹" + f(c.s[0]) + " to ₹" + f(c.s[1])],
    ["Location", (c) => c.km],
    ["Safety trade-off", (c) => c.sf],
    ["Progression", (c) => c.p],
  ];

  return (
    <>
      <h2>{t("compare")}</h2>
      <Chips />
      <div className="c sc">
        <table>
          <thead>
            <tr>
              <th></th>
              {L.map((c) => <th key={c.id}>{cn(c)}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, fn]) => (
              <tr key={label}>
                <th>{label}</th>
                {L.map((c) => <td key={c.id}>{fn(c)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="c" style={{ marginTop: 12 }}>
        <h3>What differs</h3>
        <p>
          Lowest cost: <b>{cn(cheapest)}</b> (₹{f(cheapest.c)}). Shortest: <b>{cn(shortest)}</b> ({shortest.m} months).
          Highest top-end salary: <b>{cn(mx)}</b> (₹{f(mx.s[1])}). A lower cost or shorter course is not automatically
          better; weigh safety, distance and growth with the family. All figures are illustrative.
        </p>
      </div>
    </>
  );
}
