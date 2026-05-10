export interface Project {
  id: string;
  stack: string[];
  category: "web" | "mobile" | "fullstack";
  image: string;
  links: {
    github?: string;
    live?: string;
  };
  wip?: boolean;
  team?: number; // nombre de personnes si projet de groupe
}

export const projects: Project[] = [
  {
    id: "japan-awaits",
    stack: ["React", "TypeScript", "Laravel", "Inertia.js", "Tailwind CSS", "MySQL"],
    category: "fullstack",
    image: "/projects/japan-awaits.jpg",
    links: {},
    wip: true,
  },
  {
    id: "transcendence",
    stack: ["JavaScript", "CSS", "HTML", "Python", "Django", "Docker"],
    category: "fullstack",
    image: "/projects/transcendence.jpg",
    links: {
      github: "https://github.com/AGaelleB/ft_transcendence",
    },
    team: 4,
  },
  {
    id: "timequest",
    stack: ["TypeScript", "React Native", "Expo"],
    category: "mobile",
    image: "/projects/timequest.jpg",
    links: {},
    wip: true,
    team: 2,
  },
  {
    id: "biscotte",
    stack: ["React Native", "Expo", "SQLite", "TypeScript"],
    category: "mobile",
    image: "/projects/biscotte.jpg",
    links: {
      github: "https://github.com/AGaelleB/biscotte",
    },
    wip: true,
  },
  {
    id: "portfolio",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "web",
    image: "/projects/portfolio.jpg",
    links: {
      github: "https://github.com/AGaelleB/AGaelleB.github.io",
      live: "https://agaelleb.github.io",
    },
  },
];
