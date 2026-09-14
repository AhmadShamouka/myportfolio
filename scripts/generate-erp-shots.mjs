import fs from "node:fs";
import path from "node:path";

const dir = path.join("public", "case-studies", "flashmed");
fs.mkdirSync(dir, { recursive: true });

function blurBars(ys, x = 280, w = 420) {
  return ys
    .map(
      (y, i) =>
        `<rect x="${x}" y="${y}" width="${w - (i % 3) * 40}" height="14" rx="4" fill="#94a3b8" filter="url(#blur)" opacity="0.85"/>`,
    )
    .join("");
}

function shell(title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900">
  <defs>
    <filter id="blur"><feGaussianBlur stdDeviation="4.5"/></filter>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b1220"/><stop offset="100%" stop-color="#111827"/></linearGradient>
    <linearGradient id="card" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#60a5fa"/></linearGradient>
  </defs>
  <rect width="1440" height="900" fill="url(#bg)"/>
  <rect x="0" y="0" width="220" height="900" fill="#020617"/>
  <rect x="24" y="28" width="120" height="18" rx="4" fill="#3b82f6" opacity="0.9"/>
  <rect x="24" y="70" width="160" height="10" rx="3" fill="#334155"/>
  <rect x="24" y="100" width="140" height="10" rx="3" fill="#1e293b"/>
  <rect x="24" y="130" width="150" height="10" rx="3" fill="#1e293b"/>
  <rect x="24" y="160" width="130" height="10" rx="3" fill="#1e293b"/>
  <rect x="24" y="190" width="145" height="10" rx="3" fill="#1e293b"/>
  <rect x="24" y="220" width="120" height="10" rx="3" fill="#1e293b"/>
  <rect x="220" y="0" width="1220" height="64" fill="#0f172a"/>
  <text x="248" y="40" fill="#e2e8f0" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700">${title}</text>
  <rect x="1180" y="20" width="200" height="24" rx="12" fill="#1e293b"/>
  ${body}
</svg>`;
}

const shots = {
  "01-admin-home": shell(
    "Admin home · FlashMed ERP",
    `<g transform="translate(248,96)">
      ${[0, 1, 2, 3]
        .map(
          (i) => `
        <rect x="${i * 280}" y="0" width="260" height="110" rx="14" fill="url(#card)" stroke="#334155"/>
        <rect x="${i * 280 + 20}" y="24" width="90" height="10" rx="3" fill="#64748b"/>
        <text x="${i * 280 + 20}" y="72" fill="#93c5fd" font-family="Segoe UI, Arial" font-size="34" font-weight="800">${["$2.4M", "86%", "142", "3"][i]}</text>
        <rect x="${i * 280 + 20}" y="84" width="120" height="8" rx="3" fill="#334155"/>
      `,
        )
        .join("")}
      <rect x="0" y="140" width="1120" height="520" rx="16" fill="url(#card)" stroke="#334155"/>
      <rect x="24" y="164" width="180" height="12" rx="3" fill="#64748b"/>
      <rect x="24" y="210" width="700" height="180" rx="10" fill="#020617"/>
      <path d="M60 360 L180 300 L320 320 L460 250 L620 280 L720 220" fill="none" stroke="url(#accent)" stroke-width="4"/>
      ${blurBars([420, 450, 480, 510, 540], 40, 640)}
      <rect x="760" y="210" width="320" height="400" rx="12" fill="#020617"/>
      ${blurBars([240, 280, 320, 360, 400, 440, 480, 520], 790, 260)}
    </g>`,
  ),

  "02-role-home": shell(
    "Technical engineer home",
    `<g transform="translate(248,96)">
      <rect x="0" y="0" width="540" height="280" rx="16" fill="url(#card)" stroke="#334155"/>
      <rect x="24" y="28" width="160" height="12" rx="3" fill="#64748b"/>
      ${[0, 1, 2]
        .map(
          (i) => `
        <rect x="24" y="${70 + i * 60}" width="492" height="48" rx="10" fill="#020617"/>
        <rect x="40" y="${86 + i * 60}" width="28" height="16" rx="4" fill="#3b82f6"/>
        ${blurBars([88 + i * 60], 84, 280)}
      `,
        )
        .join("")}
      <rect x="560" y="0" width="560" height="280" rx="16" fill="url(#card)" stroke="#334155"/>
      <rect x="584" y="28" width="140" height="12" rx="3" fill="#64748b"/>
      <circle cx="840" cy="160" r="78" fill="none" stroke="#1e293b" stroke-width="18"/>
      <circle cx="840" cy="160" r="78" fill="none" stroke="#3b82f6" stroke-width="18" stroke-dasharray="320 200" stroke-linecap="round"/>
      <text x="840" y="168" text-anchor="middle" fill="#e2e8f0" font-family="Segoe UI, Arial" font-size="28" font-weight="800">4.8</text>
      <rect x="0" y="304" width="1120" height="356" rx="16" fill="url(#card)" stroke="#334155"/>
      <rect x="24" y="328" width="200" height="12" rx="3" fill="#64748b"/>
      ${[0, 1, 2, 3, 4]
        .map(
          (i) => `
        <rect x="24" y="${360 + i * 52}" width="1072" height="42" rx="8" fill="#020617"/>
        <rect x="40" y="${374 + i * 52}" width="48" height="14" rx="4" fill="${["#22c55e", "#3b82f6", "#f59e0b", "#22c55e", "#64748b"][i]}"/>
        ${blurBars([374 + i * 52], 110, 520)}
      `,
        )
        .join("")}
    </g>`,
  ),

  "03-payment-schedule": shell(
    "Deal · payment schedule",
    `<g transform="translate(248,96)">
      <rect x="0" y="0" width="1120" height="100" rx="14" fill="url(#card)" stroke="#334155"/>
      <rect x="24" y="28" width="120" height="12" rx="3" fill="#64748b"/>
      ${blurBars([54], 24, 360)}
      <rect x="820" y="30" width="120" height="40" rx="8" fill="#3b82f6"/>
      <rect x="960" y="30" width="120" height="40" rx="8" fill="#1e293b"/>
      <rect x="0" y="124" width="1120" height="536" rx="16" fill="url(#card)" stroke="#334155"/>
      <rect x="24" y="148" width="1072" height="40" rx="8" fill="#020617"/>
      ${["Month", "Due", "Paid", "Status", "Reminder"]
        .map(
          (t, i) =>
            `<text x="${48 + i * 200}" y="174" fill="#94a3b8" font-family="Segoe UI, Arial" font-size="13">${t}</text>`,
        )
        .join("")}
      ${[0, 1, 2, 3, 4, 5, 6, 7]
        .map(
          (i) => `
        <rect x="24" y="${204 + i * 52}" width="1072" height="44" rx="8" fill="${i % 2 ? "#0b1220" : "#020617"}"/>
        <text x="48" y="${232 + i * 52}" fill="#cbd5e1" font-family="Segoe UI, Arial" font-size="14">${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][i]}</text>
        <rect x="248" y="${220 + i * 52}" width="80" height="14" rx="4" fill="#64748b" filter="url(#blur)"/>
        <rect x="448" y="${220 + i * 52}" width="70" height="14" rx="4" fill="#64748b" filter="url(#blur)"/>
        <rect x="648" y="${218 + i * 52}" width="72" height="20" rx="10" fill="${["#14532d", "#14532d", "#7c2d12", "#1e3a8a", "#7c2d12", "#1e293b", "#1e293b", "#1e293b"][i]}"/>
        <rect x="848" y="${218 + i * 52}" width="90" height="20" rx="10" fill="#128c7e" opacity="0.85"/>
      `,
        )
        .join("")}
    </g>`,
  ),

  "04-job-sheet": shell(
    "Field service · job sheet",
    `<g transform="translate(248,96)">
      <rect x="0" y="0" width="720" height="660" rx="16" fill="url(#card)" stroke="#334155"/>
      <rect x="24" y="28" width="180" height="14" rx="3" fill="#64748b"/>
      <text x="24" y="78" fill="#e2e8f0" font-family="Segoe UI, Arial" font-size="28" font-weight="800">JOB-4821</text>
      <rect x="200" y="56" width="90" height="28" rx="14" fill="#1d4ed8"/>
      ${blurBars([110, 150, 190], 24, 480)}
      <rect x="24" y="240" width="672" height="1" fill="#334155"/>
      <rect x="24" y="268" width="140" height="12" rx="3" fill="#64748b"/>
      ${[0, 1, 2, 3]
        .map(
          (i) => `
        <rect x="24" y="${300 + i * 70}" width="672" height="56" rx="10" fill="#020617"/>
        <rect x="40" y="${318 + i * 70}" width="36" height="20" rx="6" fill="#3b82f6"/>
        ${blurBars([320 + i * 70], 92, 400)}
      `,
        )
        .join("")}
      <rect x="744" y="0" width="376" height="660" rx="16" fill="url(#card)" stroke="#334155"/>
      <rect x="768" y="28" width="160" height="12" rx="3" fill="#64748b"/>
      <rect x="768" y="64" width="328" height="180" rx="12" fill="#020617"/>
      ${blurBars([90, 130, 170, 210], 792, 280)}
      <rect x="768" y="268" width="328" height="120" rx="12" fill="#020617"/>
      <rect x="792" y="300" width="180" height="14" rx="4" fill="#22c55e" opacity="0.7" filter="url(#blur)"/>
      <rect x="768" y="412" width="328" height="48" rx="10" fill="#128c7e"/>
      <text x="932" y="442" text-anchor="middle" fill="#fff" font-family="Segoe UI, Arial" font-size="14" font-weight="700">WhatsApp approval</text>
    </g>`,
  ),

  "05-ppm-or-contract": shell(
    "PPM · service contracts",
    `<g transform="translate(248,96)">
      <rect x="0" y="0" width="540" height="660" rx="16" fill="url(#card)" stroke="#334155"/>
      <rect x="24" y="28" width="200" height="14" rx="3" fill="#64748b"/>
      ${[0, 1, 2, 3, 4, 5]
        .map(
          (i) => `
        <rect x="24" y="${70 + i * 90}" width="492" height="74" rx="12" fill="#020617"/>
        <circle cx="56" cy="${107 + i * 90}" r="14" fill="${["#22c55e", "#f59e0b", "#22c55e", "#ef4444", "#3b82f6", "#f59e0b"][i]}"/>
        ${blurBars([96 + i * 90, 120 + i * 90], 88, 320)}
      `,
        )
        .join("")}
      <rect x="560" y="0" width="560" height="660" rx="16" fill="url(#card)" stroke="#334155"/>
      <rect x="584" y="28" width="220" height="14" rx="3" fill="#64748b"/>
      <rect x="584" y="70" width="512" height="420" rx="12" fill="#f8fafc"/>
      <rect x="620" y="110" width="200" height="12" rx="3" fill="#94a3b8"/>
      ${blurBars([150, 190, 230, 270], 620, 400)}
      <path d="M680 420 C720 380, 780 460, 840 400 C880 360, 940 440, 1000 390" fill="none" stroke="#3b82f6" stroke-width="3"/>
      <text x="840" y="500" text-anchor="middle" fill="#64748b" font-family="Segoe UI, Arial" font-size="13">Signed on screen</text>
      <rect x="584" y="520" width="512" height="100" rx="12" fill="#020617"/>
      ${blurBars([555, 590], 620, 360)}
    </g>`,
  ),

  "06-sales-insights": shell(
    "Sales insights · LB / SY / KSA",
    `<g transform="translate(248,96)">
      ${["Lebanon", "Syria", "KSA"]
        .map(
          (t, i) => `
        <rect x="${i * 380}" y="0" width="360" height="130" rx="14" fill="url(#card)" stroke="#334155"/>
        <text x="${i * 380 + 24}" y="40" fill="#94a3b8" font-family="Segoe UI, Arial" font-size="14">${t}</text>
        <text x="${i * 380 + 24}" y="88" fill="#93c5fd" font-family="Segoe UI, Arial" font-size="32" font-weight="800">${["$1.1M", "$640K", "$820K"][i]}</text>
      `,
        )
        .join("")}
      <rect x="0" y="154" width="700" height="500" rx="16" fill="url(#card)" stroke="#334155"/>
      <rect x="24" y="178" width="180" height="12" rx="3" fill="#64748b"/>
      ${[0, 1, 2, 3, 4, 5]
        .map((i) => {
          const h = [180, 120, 220, 140, 200, 160][i];
          return `<rect x="${60 + i * 100}" y="${520 - h}" width="48" height="${h}" rx="6" fill="url(#accent)" opacity="${0.55 + i * 0.07}"/>`;
        })
        .join("")}
      <rect x="724" y="154" width="396" height="500" rx="16" fill="url(#card)" stroke="#334155"/>
      <rect x="748" y="178" width="160" height="12" rx="3" fill="#64748b"/>
      ${[0, 1, 2, 3, 4, 5, 6]
        .map(
          (i) => `
        <rect x="748" y="${214 + i * 55}" width="348" height="42" rx="8" fill="#020617"/>
        ${blurBars([228 + i * 55], 768, 240)}
        <rect x="1020" y="${226 + i * 55}" width="50" height="14" rx="4" fill="#3b82f6" opacity="0.7"/>
      `,
        )
        .join("")}
    </g>`,
  ),

  "07-daily-reports": shell(
    "Daily reports · manager review",
    `<g transform="translate(248,96)">
      <rect x="0" y="0" width="1120" height="80" rx="14" fill="url(#card)" stroke="#334155"/>
      <rect x="24" y="30" width="200" height="20" rx="6" fill="#3b82f6"/>
      <rect x="240" y="30" width="140" height="20" rx="6" fill="#1e293b"/>
      <rect x="900" y="24" width="180" height="32" rx="8" fill="#14532d"/>
      <rect x="0" y="104" width="1120" height="556" rx="16" fill="url(#card)" stroke="#334155"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7]
        .map(
          (i) => `
        <rect x="24" y="${128 + i * 64}" width="1072" height="52" rx="10" fill="${i % 2 ? "#0b1220" : "#020617"}"/>
        <text x="48" y="${160 + i * 64}" fill="#cbd5e1" font-family="Segoe UI, Arial" font-size="14">2024-0${(i % 9) + 1}-1${i}</text>
        ${blurBars([148 + i * 64], 220, 420)}
        <rect x="900" y="${144 + i * 64}" width="88" height="22" rx="11" fill="${["#14532d", "#1e3a8a", "#7c2d12", "#14532d", "#1e3a8a", "#14532d", "#1e293b", "#14532d"][i]}"/>
        <rect x="1008" y="${144 + i * 64}" width="60" height="22" rx="6" fill="#334155"/>
      `,
        )
        .join("")}
    </g>`,
  ),

  "08-ai-report": shell(
    "AI department briefing",
    `<g transform="translate(248,96)">
      <rect x="0" y="0" width="360" height="660" rx="16" fill="url(#card)" stroke="#334155"/>
      <rect x="24" y="28" width="160" height="12" rx="3" fill="#64748b"/>
      ${["Collections", "Sales", "Service", "Finance"]
        .map(
          (t, i) => `
        <rect x="24" y="${70 + i * 70}" width="312" height="54" rx="10" fill="${i === 0 ? "#1d4ed8" : "#020617"}"/>
        <text x="48" y="${103 + i * 70}" fill="#e2e8f0" font-family="Segoe UI, Arial" font-size="15">${t}</text>
      `,
        )
        .join("")}
      <rect x="384" y="0" width="736" height="660" rx="16" fill="url(#card)" stroke="#334155"/>
      <rect x="408" y="28" width="220" height="14" rx="3" fill="#64748b"/>
      <rect x="408" y="64" width="120" height="28" rx="14" fill="#3b82f6" opacity="0.85"/>
      <text x="468" y="83" text-anchor="middle" fill="#fff" font-family="Segoe UI, Arial" font-size="12" font-weight="700">AI summary</text>
      <rect x="408" y="120" width="688" height="500" rx="12" fill="#020617"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        .map(
          (i) =>
            `<rect x="432" y="${148 + i * 42}" width="${520 - (i % 4) * 60}" height="14" rx="4" fill="#64748b" opacity="0.55" filter="url(#blur)"/>`,
        )
        .join("")}
    </g>`,
  ),
};

for (const [name, svg] of Object.entries(shots)) {
  const file = path.join(dir, `${name}.svg`);
  fs.writeFileSync(file, svg);
  console.log("wrote", file);
}
