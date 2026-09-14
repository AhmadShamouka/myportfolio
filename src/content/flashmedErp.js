export const flashmedErp = {
  slug: "flashmed-erp",
  kicker: "02 — Case study",
  title: "FlashMed ERP",
  subtitle: "Medical equipment operations across Lebanon, Syria, and KSA",
  year: "2023 – Present",
  role: "Sole full-stack engineer",
  stack: ["Laravel", "MySQL", "Spatie permissions", "OpenAI", "Pusher", "WhatsApp"],
  summary:
    "I customized Ultimate POS into FlashMed’s day-to-day ERP: selling machines and consumables, collecting installments, running field service, and reporting across three countries — plus a customer portal so clients can open and track service tickets themselves. The screens below are the parts I designed and shipped — not a tour of the stock product list.",
  replaceHint:
    "Private production UI — money, sales figures, and phone numbers are redacted. No public URL.",
  shots: [
    {
      n: "01",
      file: "01-admin-home",
      title: "A home screen that matches the job",
      problem:
        "Leadership was bouncing between reports just to see how the year was going.",
      built:
        "An admin home with live totals, cash movement, and one-tap jumps into Technical, Accounting, Customer, and Sales dashboards.",
    },
    {
      n: "02",
      file: "02-role-home",
      title: "Same database, different dashboards",
      problem:
        "A salesman and a field engineer do not share a job — but they were stuck on the same generic home.",
      built:
        "Role homes with only the tiles that role needs — leads, quotations, payment schedule, receivables, service calls — on one permission layer.",
    },
    {
      n: "03",
      file: "03-payment-schedule",
      images: ["03-payment-schedule", "03-payment-table"],
      title: "Installments instead of a spreadsheet",
      problem:
        "Collections lived in side spreadsheets and chat threads while deals sold on payment plans.",
      built:
        "A payments hub with collection KPIs plus a schedule table for due, paid, remaining, and status — reminders stay on the same record.",
    },
    {
      n: "04",
      file: "04-service-tickets",
      title: "Repair system tickets",
      problem:
        "Maintenance, installation, and service-deal work mixed into one queue — engineers and managers could not see load by type.",
      built:
        "A Service Ticket board with Maintenance, Installation, and Service Deal columns — client, ticket number, status tags, and deal actions on each card.",
    },
    {
      n: "05",
      file: "05-services-contract",
      title: "Services contracts at a glance",
      problem:
        "Contract end dates and remaining coverage lived outside the ERP, so renewals slipped until a machine failed.",
      built:
        "A Services Contract board with per-client cards, end dates, and days remaining — plus Add to open a new contract from the same screen.",
    },
    {
      n: "06",
      file: "06-sales-insights",
      title: "Sales insights and three markets",
      problem: "Managers asked for Excel every week to compare Lebanon, Syria, and KSA.",
      built:
        "Sales Insights for salesmen, categories, customers, and machines — with PDF/Excel export and combined three-market rollups.",
    },
    {
      n: "07",
      file: "07-tasks",
      title: "Tasks by engineer and priority",
      problem:
        "Managers could not see who was overloaded or which work was Hot versus Low without opening each person’s queue.",
      built:
        "A tasks board with team totals by priority and per-engineer cards — Low / Medium / High / Hot — so load and urgency are visible in one screen.",
    },
    {
      n: "08",
      file: "08-ai-report",
      title: "AI analysis for each engineer",
      problem:
        "Managers could see ticket counts, but not a written read on how each engineer was performing.",
      built:
        "Per-engineer performance cards with completed / pending breakdowns and an AI Analytics action that briefs from the same repair data.",
    },
    {
      n: "09",
      file: "09-portal-phone",
      images: ["09-portal-phone", "09-portal-otp", "09-portal-requests"],
      title: "Customer portal to apply for tickets",
      problem:
        "Customers called or WhatsApp’d to open a service ticket, so requests were slow to capture and hard for them to track.",
      built:
        "A bilingual customer portal: phone + OTP verification, then service request submit — plus My Requests so clients can follow job sheets and rate completed work.",
    },
  ],
};
