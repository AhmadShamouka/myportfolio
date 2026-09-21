export const flashmedErp = {
  slug: "flashmed-erp",
  kicker: "02 — Case study",
  title: "FlashMed ERP",
  subtitle: "Medical equipment operations across Lebanon, Syria, and KSA",
  year: "2023 – Present",
  role: "Sole full-stack engineer",
  stack: ["Laravel", "MySQL", "Spatie permissions", "OpenAI", "Pusher", "WhatsApp"],
  summary:
    "I customized Ultimate POS into FlashMed’s day-to-day ERP: selling machines and consumables, collecting installments, running field service, and reporting across three countries — plus role dashboards and a customer-facing ticket flow. The screens below are the parts I designed and shipped.",
  replaceHint:
    "Private production UI — money and sales figures are redacted. No public URL.",
  shots: [
    {
      n: "01",
      file: "01-home-modules",
      title: "A home screen built around real work",
      problem:
        "People landed on a generic POS home that didn’t match how FlashMed actually runs day to day.",
      built:
        "A role home with pending/completed signals, engineer rating, and one-tap modules for Technical, Sales, Portal & Tickets, Finance, HR, and Customers.",
    },
    {
      n: "02",
      file: "02-sales-home",
      title: "Sales home for the people who sell",
      problem:
        "Sales staff had to dig through stock menus for leads, quotations, payments, and delivery work.",
      built:
        "A sales home with the tiles they use daily — Sales Analysis, Leads, Customers, Purchase Orders, Payment Schedules, bonuses, and quarter dashboards.",
    },
    {
      n: "03",
      file: "03-add-quotation",
      title: "Quotations with live product search",
      problem:
        "Building a quote meant hunting products across lists and side sheets.",
      built:
        "An Add Quotation flow with Customer → Products → Discount steps and instant product search (price and stock shown on the same row).",
    },
    {
      n: "04",
      file: "04-tickets-dashboard",
      title: "Service tickets at a glance",
      problem:
        "Managers couldn’t see ticket load by status or region without opening each queue.",
      built:
        "A Service Tickets Dashboard with To Be Approved / Pending / Completed / Delayed cards, plus Central–East–West regional closing times.",
    },
    {
      n: "05",
      file: "05-maintenance-dashboard",
      title: "Maintenance by status and region",
      problem:
        "Delayed maintenance was hard to spot until customers escalated.",
      built:
        "A maintenance board with status totals, a region chart (Pending / Delayed / To Be Approved), ratings, and PPM daily–weekly–monthly summary.",
    },
    {
      n: "06",
      file: "06-salesman-insights",
      images: ["06-salesman-insights", "06-salesman-insights-b"],
      title: "Salesman targets and monthly pace",
      problem:
        "Leadership asked for Excel every week to see who was on target and who had hot leads.",
      built:
        "A salesman dashboard with per-rep cards for total sales, target, %, leads, hot leads, and remaining — filterable by year and month.",
    },
    {
      n: "07",
      file: "07-tasks",
      title: "Tasks by engineer and priority",
      problem:
        "Managers could not see who was overloaded or which work was Hot versus Low without opening each person’s queue.",
      built:
        "A tasks board with All / Completed totals and per-engineer cards — Low / Medium / High / Hot — so load and urgency are visible in one screen.",
    },
    {
      n: "08",
      file: "08-calendar",
      title: "Team calendar across users and departments",
      problem:
        "Service visits and appointments lived in chat threads, so clashes showed up only on the day.",
      built:
        "A shared month calendar with filters for users and departments, so field work and meetings sit on one schedule.",
    },
    {
      n: "09",
      file: "09-hr-home",
      title: "HR home for leave, payroll, and staff files",
      problem:
        "Leave requests, payroll, and staff documents were split across tools HR had to check separately.",
      built:
        "An HR home with On Leave / Pending / Approved cards plus shortcuts into Payroll, Documents, Manage Staff, and Internships.",
    },
    {
      n: "10",
      file: "10-repair-ai",
      title: "Repair dashboard with AI analytics",
      problem:
        "Managers could see ticket counts, but not a quick read on each engineer’s completed vs pending work.",
      built:
        "A Repair Dashboard with ticket overview cards and per-engineer performance — View Jobs plus AI Analytics on the same repair data.",
    },
  ],
};
