import { f } from "./format.js";

/* ---------- UI strings: [English, Hindi] ---------- */
export const T = {
  home: ["Home", "होम"],
  start: ["Family counselling", "पारिवारिक काउंसलिंग"],
  explore: ["Careers", "करियर"],
  chat: ["Chat", "चैट"],
  compare: ["Compare", "तुलना"],
  roi: ["ROI", "ROI"],
  plan: ["Action plan", "कार्य योजना"],
  sessions: ["Sessions", "सत्र"],
  dash: ["Dashboards", "डैशबोर्ड"],
  note: [
    "Prototype demonstration: data, AI responses, and outcome figures are simulated.",
    "प्रोटोटाइप प्रदर्शन: डेटा, AI उत्तर और परिणाम के आंकड़े काल्पनिक हैं।",
  ],
  tag: ["From parental doubt to career confidence", "माता-पिता की शंका से करियर के आत्मविश्वास तक"],
  intro: [
    "NextLume helps a learner and their family explore vocational careers, understand costs and earnings, talk through worries respectfully, and agree on one shared career plan.",
    "NextLume सीखने वाले और परिवार को व्यावसायिक करियर समझने, खर्च और कमाई जानने, चिंताओं पर सम्मान से बात करने और एक साझा योजना बनाने में मदद करता है।",
  ],
  go: ["Start Family Counselling", "पारिवारिक काउंसलिंग शुरू करें"],
  adm: ["Counsellor / Admin demo", "काउंसलर / एडमिन डेमो"],
  send: ["Send", "भेजें"],
  fin: ["Finish session", "सत्र पूरा करें"],
  print: ["Print / Save as PDF", "प्रिंट / PDF"],
};

export const NAV_KEYS = ["start", "explore", "chat", "compare", "roi", "plan", "sessions", "dash"];

/* ---------- Careers (illustrative figures) ---------- */
export const C = [
  { id: 1, n: "Electrician (Domestic)", h: "इलेक्ट्रीशियन (घरेलू)", d: "Installs, repairs and maintains household wiring, switches and appliances.", m: 3, c: 12000, q: "NSQF 4", s: [12000, 22000], sk: ["Wiring", "Safety", "Fault finding"], r: ["Domestic electrician", "Maintenance helper", "Own service business"], sf: "Work with live current; insured, trained workers use insulated tools and lockout practice.", p: "Trainee, electrician, senior technician, supervisor or own business", km: "Demand in every town; many start near home" },
  { id: 2, n: "Solar PV Installer", h: "सोलर पीवी इंस्टॉलर", d: "Installs and services rooftop solar panels and inverters.", m: 3, c: 15000, q: "NSQF 4", s: [14000, 26000], sk: ["Panel mounting", "DC wiring", "Site safety"], r: ["Solar installer", "Service technician", "Site assistant"], sf: "Roof height work; harness training is essential.", p: "Installer, lead technician, site supervisor", km: "Jobs concentrate near larger towns; travel to sites" },
  { id: 3, n: "Retail Sales Associate", h: "रिटेल सेल्स एसोसिएट", d: "Helps customers, manages stock and billing in shops and stores.", m: 2, c: 6000, q: "NSQF 4", s: [10000, 18000], sk: ["Communication", "Billing", "Stock handling"], r: ["Sales associate", "Cashier", "Store assistant"], sf: "Indoor, low-risk; check shift timings and commute.", p: "Associate, team lead, store manager", km: "Available in most cities and many towns" },
  { id: 4, n: "General Duty Assistant", h: "जनरल ड्यूटी असिस्टेंट", d: "Supports nurses and patients in hospitals and home care.", m: 3, c: 10000, q: "NSQF 4", s: [11000, 19000], sk: ["Patient care", "Hygiene", "Basic first aid"], r: ["Hospital assistant", "Home care aide", "Ward helper"], sf: "Infection-control training required; night shifts are common.", p: "Assistant, senior aide, specialist assistant courses", km: "Hospitals in district towns; hostel may help" },
  { id: 5, n: "Automotive Service Technician", h: "ऑटोमोटिव सर्विस टेक्नीशियन", d: "Services and repairs two-wheelers and cars in workshops.", m: 6, c: 24000, q: "NSQF 4", s: [13000, 25000], sk: ["Engine basics", "Diagnostics", "Tool use"], r: ["Service technician", "Workshop assistant", "Own garage"], sf: "Grease, heavy parts and noise; protective gear needed.", p: "Technician, senior technician, service advisor", km: "Workshops in towns and highway belts" },
  { id: 6, n: "Sewing Machine Operator", h: "सिलाई मशीन ऑपरेटर", d: "Stitches garments in factories or runs home-based tailoring.", m: 3, c: 8000, q: "NSQF 4", s: [9000, 16000], sk: ["Stitching", "Pattern reading", "Quality checks"], r: ["Machine operator", "Tailor", "Home-based unit"], sf: "Seated work; eye strain and posture care matter.", p: "Operator, line supervisor, small unit owner", km: "Home-based work possible near family" },
  { id: 7, n: "Beauty and Wellness Associate", h: "ब्यूटी एंड वेलनेस एसोसिएट", d: "Provides hair, skin and grooming services at salons.", m: 4, c: 14000, q: "NSQF 4", s: [10000, 24000], sk: ["Skin care", "Hygiene", "Customer care"], r: ["Salon associate", "Home service", "Salon owner"], sf: "Chemical exposure; gloves and ventilation matter.", p: "Associate, senior stylist, salon owner", km: "Salons in towns; home services possible" },
  { id: 8, n: "Arc Welder", h: "आर्क वेल्डर", d: "Joins metal parts for fabrication and construction.", m: 4, c: 16000, q: "NSQF 4", s: [14000, 28000], sk: ["Arc welding", "Blueprint reading", "Safety gear"], r: ["Welder", "Fabricator", "Shop-floor helper"], sf: "Heat, sparks and fumes; helmet, gloves and ventilation required.", p: "Welder, senior welder, fabrication supervisor", km: "Industrial areas; commute or relocation likely" },
];

export const D = [
  "Patna, Bihar",
  "Lucknow, Uttar Pradesh",
  "Jaipur, Rajasthan",
  "Nashik, Maharashtra",
  "Ranchi, Jharkhand",
];

export const CN = {
  salary: ["Salary", "वेतन"],
  job: ["Job security", "नौकरी की सुरक्षा"],
  safety: ["Safety", "सुरक्षा"],
  status: ["Social status", "सामाजिक प्रतिष्ठा"],
  distance: ["Distance", "दूरी"],
};

export const SX = {
  done: ["Completed", "पूर्ण"],
  active: ["Active", "सक्रिय"],
  escalated: ["Needs human counsellor", "काउंसलर चाहिए"],
};

export const EDU = ["Class 8 pass", "Class 10 pass", "Class 12 pass", "ITI / Diploma", "Graduate"];
export const PREFS = [
  "Prefer a nearby centre",
  "Prefer a short course",
  "Prefer a government-recognised provider",
  "No strong preference",
];

export const newDraft = () => ({
  name: "",
  age: "",
  edu: EDU[0],
  interests: "",
  career: 1,
  district: D[0],
  budget: "",
  concerns: [],
  pref: PREFS[0],
});

/* ---------- Demo seed data ---------- */
export function seedState() {
  const A = [
    ["Aarav K.", 18, 1, 0, "salary", 15000, "done", 2.4, 3.6, 3],
    ["Priya S.", 17, 4, 1, "safety", 12000, "done", 2.1, 3.4, 6],
    ["Rohan M.", 19, 2, 2, "job", 20000, "active", 2.5, 2.5, 1],
    ["Sneha D.", 20, 7, 3, "status", 15000, "done", 1.9, 3, 9],
    ["Imran A.", 18, 8, 4, "distance", 18000, "active", 2.8, 2.8, 2],
    ["Kavya R.", 17, 6, 0, "salary", 9000, "done", 2.2, 3.5, 14],
    ["Deepak Y.", 21, 5, 1, "job", 25000, "active", 2.6, 2.6, 4],
    ["Meera P.", 18, 3, 2, "safety", 7000, "done", 2.3, 3.5, 20],
    ["Sahil T.", 19, 1, 3, "status", 12000, "escalated", 2, 2, 5],
    ["Nisha V.", 18, 4, 4, "distance", 11000, "active", 2.7, 2.7, 0],
  ];
  return {
    lang: "en",
    cur: 1,
    plan: {},
    msgs: {},
    sessions: A.map((a, i) => ({
      id: i + 1,
      name: a[0],
      age: a[1],
      career: a[2],
      district: D[a[3]],
      concerns: [a[4]],
      budget: a[5],
      status: a[6],
      cb: a[7],
      ca: a[8],
      days: a[9],
      edu: "Class 12 pass",
      seed: 1,
    })),
  };
}

/* ---------- Simulated counsellor engine: each returns [English, Hindi] ---------- */
export const R = {
  salary: (c) => [
    `Income is a fair worry. Illustrative range for ${c.n}: ₹${f(c.s[0])} to ₹${f(c.s[1])} per month, depending on city, employer and skill. The ROI page shows payback with your own numbers.`,
    `कमाई की चिंता जायज़ है। ${c.h} के लिए अनुमानित आय ₹${f(c.s[0])} से ₹${f(c.s[1])} प्रति माह है। अपने आंकड़ों के लिए ROI पेज देखें।`,
  ],
  safety: (c) => [
    `Safety matters. For ${c.n}: ${c.sf} Ask the centre about protective gear, supervised practice and a safe commute.`,
    `सुरक्षा ज़रूरी है। ${c.h}: ${c.sf} केंद्र से सुरक्षा उपकरण, निगरानी में अभ्यास और सुरक्षित आवागमन के बारे में पूछें।`,
  ],
  job: (c) => [
    `Job security can be checked, not assumed. Ask the provider for recent placement records, and look at progression: ${c.p}. No placement is guaranteed.`,
    `नौकरी की सुरक्षा जांची जा सकती है। प्रशिक्षण केंद्र से हाल का प्लेसमेंट रिकॉर्ड मांगें। आगे बढ़ने का रास्ता: ${c.p}। कोई नौकरी गारंटीशुदा नहीं है।`,
  ],
  status: (c) => [
    `Respect and status are real concerns for families. Many people grow from ${c.r[0]} to supervisor roles or their own work. A visit to the centre with relatives can help.`,
    `सम्मान और प्रतिष्ठा परिवारों के लिए वास्तविक चिंता है। कई लोग ${c.r[0]} से सुपरवाइज़र या अपने काम तक पहुंचते हैं। रिश्तेदारों के साथ केंद्र देखने जाना मदद करता है।`,
  ],
  distance: (c) => [
    `Distance is a practical issue. ${c.km}. Compare a nearer centre, daily travel cost and hostel options before deciding.`,
    `दूरी एक व्यावहारिक मुद्दा है। ${c.km}। निर्णय से पहले पास का केंद्र, रोज़ का यात्रा खर्च और हॉस्टल देखें।`,
  ],
  cost: (c) => [
    `Illustrative training cost for ${c.n} is about ₹${f(c.c)} for ${c.m} months. Ask about instalments or eligible government schemes, but do not assume any benefit.`,
    `${c.h} का अनुमानित प्रशिक्षण खर्च लगभग ₹${f(c.c)} (${c.m} महीने) है। किस्तों या योजनाओं के बारे में पूछें, लाभ को पक्का न मानें।`,
  ],
  learn: (c) => [
    `In ${c.n} you would learn: ${c.sk.join(", ")}. Typical roles: ${c.r.join(", ")}.`,
    `${c.h} में आप सीखेंगे: ${c.sk.join(", ")}।`,
  ],
  talk: () => [
    `A good way to talk: each person shares one hope and one worry, and both are written down. Then visit one centre together. Nobody has to decide today.`,
    `बात करने का अच्छा तरीका: हर व्यक्ति एक उम्मीद और एक चिंता बताए, फिर साथ में एक केंद्र देखें। आज निर्णय लेना ज़रूरी नहीं।`,
  ],
};

export const KW = [
  ["salary", /salary|pay|earn|income|money|वेतन|पैसा|कमाई|सैलरी/i],
  ["safety", /safe|danger|risk|daughter|girl|सुरक्षा|बेटी|खतरा/i],
  ["job", /job|secur|placement|permanent|नौकरी|रोजगार/i],
  ["status", /status|relative|respect|society|log kya|समाज|इज्जत|प्रतिष्ठा|रिश्तेदार/i],
  ["distance", /far|distance|hostel|away|travel|दूर|दूरी|हॉस्टल/i],
  ["cost", /cost|fee|afford|expensive|खर्च|फीस|महंगा/i],
  ["learn", /learn|syllabus|course|like|interest|सीख|पसंद/i],
  ["talk", /convince|parent|talk|discuss|समझा|बात/i],
];
