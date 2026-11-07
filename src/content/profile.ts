/** Single source for personal details. Empty string = link is not rendered. */
export const profile = {
  name: "Michael Tejada",
  firstName: "Michael",
  role: "Web designer & developer · AI automation specialist",
  heroLabel: "WEB DESIGNER & DEVELOPER / AI AUTOMATION SPECIALIST",
  heroHeadline: "I BUILD PRODUCTS AND THE AI AUTOMATIONS THAT RUN THEM.",
  location: "Butuan City, Philippines",
  timezoneNote: "UTC+8 · overlaps US evenings, AU and EU working hours",
  availability: "Open to remote roles & contracts",
  email: "michaeltejada.work@gmail.com",
  github: "https://github.com/mikoy0019",
  linkedin: "",
  resumeUrl: "https://drive.google.com/file/d/1XGZvRAUmWyxmQkHE5tBZ7ePmhTL_4gFG/view?usp=drive_link",
  photo: "/michael.jpg",
  portrait: "/michael-portrait.webp",
  siteUrl: "https://michael-portfolio.michaeltejada-work.workers.dev",
} as const;

export type Profile = typeof profile;
