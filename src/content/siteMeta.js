import { asset } from "../lib/asset.js";

/** Non-translated identity, links, and visual metadata. */
export const siteMeta = {
  name: "Ahmad Shamouka",
  fullName: "Ahmad Shamouka",
  email: "shamoukaahmad@gmail.com",
  emailHref: "mailto:shamoukaahmad@gmail.com",
  github: "https://github.com/AhmadShamouka",
  linkedin: "https://lb.linkedin.com/in/ahmadshamouka",
  phone: "+961 70 938 737",
  phoneHref: "tel:+96170938737",
  whatsapp: "+961 70 938 737",
  whatsappHref: "https://wa.me/96170938737",
  logos: ["LIU", "FlashMed", "SEF", "Trusto", "BrightChamps"],
  introNav: [
    ["career", "project", "certification"],
    ["technology", "contact"],
  ],
  careerCardStyles: [
    {
      badge: "FM",
      tone: "linear-gradient(145deg, #1e3a8a 0%, #0a0a0a 55%, #172554 100%)",
      accent:
        "radial-gradient(circle at 30% 20%, rgb(59 130 246 / 0.45), transparent 55%)",
    },
    {
      badge: "TT",
      tone: "linear-gradient(145deg, #262626 0%, #0a0a0a 55%, #171717 100%)",
      accent:
        "radial-gradient(circle at 70% 30%, rgb(255 255 255 / 0.18), transparent 50%)",
    },
    {
      badge: "BC",
      tone: "linear-gradient(145deg, #1d4ed8 0%, #0a0a0a 55%, #1e3a8a 100%)",
      accent:
        "radial-gradient(circle at 40% 70%, rgb(147 197 253 / 0.35), transparent 55%)",
    },
    {
      badge: "LIU",
      tone: "linear-gradient(145deg, #404040 0%, #0a0a0a 55%, #262626 100%)",
      accent:
        "radial-gradient(circle at 60% 25%, rgb(255 255 255 / 0.16), transparent 55%)",
    },
  ],
  techItems: [
    { name: "React", mark: "⚛" },
    { name: "Laravel", mark: "La" },
    { name: "TypeScript", mark: "TS" },
    { name: "Node.js", mark: "No" },
    { name: "MySQL", mark: "SQL" },
    { name: "Tailwind", mark: "Tw" },
    { name: "Python", mark: "Py" },
    { name: "Git", mark: "Git" },
    { name: "Pusher", mark: "Pu" },
    { name: "OpenAI", mark: "AI" },
    { name: "JavaScript", mark: "JS" },
    { name: "Docker", mark: "Dk" },
  ],
  workItemMeta: [
    {
      id: "01",
      year: "2024",
      href: "https://github.com/AhmadShamouka",
      tone: "blue",
      video: asset("videos/FlashMED-demo.mp4"),
    },
    {
      id: "02",
      year: "2024",
      href: "#/work/flashmed-erp",
      caseStudy: "flashmed-erp",
      tone: "white",
    },
    {
      id: "03",
      year: "2023",
      href: "https://github.com/AhmadShamouka/loyality-reward-app",
      tone: "blue",
      preview: asset("work/loyality.png"),
    },
    {
      id: "04",
      year: "2023",
      href: "https://thebrandfantasticator.com",
      tone: "white",
      preview: asset("work/brandfantasticator.png"),
    },
    {
      id: "05",
      year: "2023",
      href: "https://mconceptco.com/?page_id=168",
      tone: "blue",
      preview: asset("work/mconceptco.png"),
    },
    {
      id: "06",
      year: "2023",
      href: "https://github.com/AhmadShamouka/unreal",
      tone: "white",
      preview: asset("work/unrealfit.jpg"),
    },
  ],
};

export function buildSite(copy) {
  return {
    name: siteMeta.name,
    fullName: siteMeta.fullName,
    email: siteMeta.email,
    emailHref: siteMeta.emailHref,
    github: siteMeta.github,
    linkedin: siteMeta.linkedin,
    phone: siteMeta.phone,
    phoneHref: siteMeta.phoneHref,
    whatsapp: siteMeta.whatsapp,
    whatsappHref: siteMeta.whatsappHref,
    logos: siteMeta.logos,
    introNav: siteMeta.introNav,
    role: copy.role,
    bio: copy.bio,
    introBio: copy.introBio,
    introBioStrong: copy.introBioStrong,
    stats: copy.stats,
    nav: copy.nav,
    ui: copy.ui,
    panels: {
      career: {
        kicker: copy.career.kicker,
        title: copy.career.title,
        cards: siteMeta.careerCardStyles.map((style, index) => ({
          ...style,
          ...copy.career.cards[index],
        })),
      },
    },
    technologies: {
      kicker: copy.technologies.kicker,
      titleBefore: copy.technologies.titleBefore,
      titleAccent: copy.technologies.titleAccent,
      subtitle: copy.technologies.subtitle,
      items: siteMeta.techItems,
    },
    selectedWork: {
      kicker: copy.selectedWork.kicker,
      items: siteMeta.workItemMeta.map((meta, index) => ({
        ...meta,
        ...copy.selectedWork.items[index],
      })),
    },
    contact: copy.contact,
    experience: copy.experience,
  };
}
