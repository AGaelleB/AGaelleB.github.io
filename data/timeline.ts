export interface TimelineItem {
  id: string;
  date: string;
  company: string;
  location: string;
  type: "work" | "education" | "project";
  tags?: string[];
}

export const timelineData: TimelineItem[] = [
  {
    id: "japan",
    date: "2025 - 2026",
    company: "Japan Awaits",
    location: "Tokyo / Remote",
    type: "work",
    tags: ["React", "Laravel", "Inertia.js", "API", "Git"],
  },
  {
    id: "42",
    date: "2022 — 2024",
    company: "École 42 Paris",
    location: "Paris",
    type: "education",
    tags: ["C", "C++", "Programmation Système", "Architecture"],
  },
  {
    id: "piscine",
    date: "Août 2022",
    company: "École 42",
    location: "Paris",
    type: "education",
    tags: ["C", "Shell", "Logique"],
  },
  {
    id: "fiacat",
    date: "2019 — 2022",
    company: "FIACAT (ONG)",
    location: "Paris",
    type: "work",
    tags: ["Gestion financière", "Audit", "ONG"],
  },
];