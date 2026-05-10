export interface Project {
  id: string;
  stack: string[];
  category: "web" | "mobile" | "fullstack" | "systems";
  image: string;
  gif?: string;
  links: {
    github?: string;
    live?: string;
  };
  wip?: boolean;
  team?: number;
}

export const projects: Project[] = [
  {
    id: "japan-awaits",
    stack: ["React", "TypeScript", "Laravel", "Inertia.js", "Tailwind CSS", "PHP"],
    category: "fullstack",
    image: "/projects/japanawaits+logo.png",
    links: {
        live: "https://portal.japanawaits.com/",
    },
  },
  {
    id: "transcendence",
    stack: ["JavaScript", "Django", "PostgreSQL", "Docker", "WebSockets", "CSS"],
    category: "fullstack",
    image: "/projects/ft_transcendence.gif",
    gif: "/projects/ft_transcendence2.gif",
    links: {
      github: "https://github.com/AGaelleB/15-ft_transcendence",
    },
    team: 4,
  },
  {
    id: "cub3d",
    stack: ["C", "Makefile", "Shell"],
    category: "systems",
    image: "/projects/Cub3D.gif",
    gif: "/projects/Cub3D.gif",
    links: {
      github: "https://github.com/AGaelleB/11-Cub3D",
    },    team: 2,
  },
  {
    id: "timequest",
    stack: ["TypeScript", "React Native", "Expo"],
    category: "mobile",
    image: "/projects/timequest_logo.png",
    gif: "/projects/TimeQuest.gif",
    links: {},
    wip: true,
    team: 2,
  },
  {
    id: "biscotte",
    stack: ["React Native", "Expo", "SQLite", "TypeScript"],
    category: "mobile",
    image: "/projects/biscotte.png",
    links: {},
    wip: true,
  },
  {
    id: "portfolio",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "web",
    image: "/projects/porfolio.png",
    links: {
      github: "https://github.com/AGaelleB/AGaelleB.github.io",
      live: "https://agaelleb.github.io",
    },
  },
];
