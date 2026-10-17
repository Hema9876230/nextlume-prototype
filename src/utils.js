import { C, CN, KW, R } from "./data.js";
import { f } from "./format.js";

export { f };

export const gc = (id) => C.find((x) => x.id == id) || C[0];

export const cnt = (arr, fn) =>
  arr.reduce((o, x) => {
    const k = fn(x);
    o[k] = (o[k] || 0) + 1;
    return o;
  }, {});

export const navigate = (path) => {
  window.location.hash = "#" + path;
};

/** Simulated counsellor reply */
export function reply(text, s, lang) {
  const c = gc(s.career);
  const k = (KW.find((a) => a[1].test(text)) || [])[0] || s.concerns[0] || "talk";
  const r = R[k](c)[lang === "hi" ? 1 : 0];
  return (
    r +
    (lang === "hi"
      ? " दोनों के विचार महत्वपूर्ण हैं।"
      : " Both views matter, and there is no pressure to decide today.")
  );
}

/** First assistant message for a session */
export function greeting(s, lang) {
  const c = gc(s.career);
  const hi = lang === "hi";
  const career = hi ? c.h : c.n;
  const concern = CN[s.concerns[0]][hi ? 1 : 0];
  return {
    r: "a",
    t: hi
      ? `नमस्ते। मैं ${s.name} के परिवार के लिए ${career} पर चर्चा में मदद करूंगा। मुख्य चिंता: ${concern}।`
      : `Hello. I will help ${s.name}’s family talk through ${career}. Main concern: ${concern}.`,
  };
}

/** 30-day action plan. `cl` is the localised concern-label function. */
export function planFor(s, cl) {
  const c = gc(s.career);
  const over = c.c > s.budget;
  return {
    W: [
      [
        "Week 1: Talk and shortlist",
        [
          "Hold the family discussion using the checklist below",
          "Shortlist 2 or 3 recognised training providers near " + s.district.split(",")[0],
          "Write down the main concern: " + cl(s.concerns[0]),
        ],
      ],
      [
        "Week 2: Visit and verify",
        [
          "Visit one centre and see the workshop",
          "Ask the provider the questions listed below",
          over
            ? `Training (₹${f(c.c)}) is above your budget (₹${f(s.budget)}): ask about instalments or schemes`
            : `Training cost (₹${f(c.c)}) fits your budget (₹${f(s.budget)})`,
        ],
      ],
      [
        "Week 3: Prepare",
        [
          "Collect the documents listed below",
          "Practise basics of: " + c.sk.join(", "),
          "Run the ROI calculator together",
        ],
      ],
      [
        "Week 4: Decide",
        [
          "Compare with one alternative career",
          "Agree one shared family plan",
          "Enrol, or book a counsellor follow-up",
        ],
      ],
    ],
    docs: [
      "Aadhaar card (or ID proof)",
      "Education certificates",
      "Passport photographs",
      "Bank account details",
      "Address proof",
    ],
    q: [
      "Is the centre recognised, and for which NSQF level?",
      "What are the total fees, including exam and kit?",
      "What were last batch’s placement records?",
      "Is practical workshop time supervised, with safety gear?",
      "Is there a refund policy?",
    ],
    fam: [
      "Each person states one hope and one worry",
      "Review safety and distance together",
      "Agree a budget limit",
      "Decide who visits the centre",
      "Set a date to review progress",
    ],
  };
}
