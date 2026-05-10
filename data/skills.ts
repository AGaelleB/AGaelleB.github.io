export interface Skill {
  name: string;
  level: number; // 1-5
  category:
    | "frontend"
    | "backend"
    | "mobile"
    | "tools"
    | "languages"
    | "softskills";
  logo: string; // URL CDN devicon SVG ou fallback
}

export interface SkillCategory {
  id: string;
  labelFr: string;
  labelEn: string;
  skills: Skill[];
}

const devicon = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

/* fallback simple et safe */
const icon = (emoji: string) =>
  `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="32">
      ${emoji}
    </text>
  </svg>
`)}`;

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    labelFr: "Frontend",
    labelEn: "Frontend",
    skills: [
      { name: "React", level: 4, category: "frontend", logo: devicon("react") },
      { name: "TypeScript", level: 3, category: "frontend", logo: devicon("typescript") },
      { name: "Next.js", level: 2, category: "frontend", logo: devicon("nextjs", "original") },
      { name: "Tailwind CSS", level: 4, category: "frontend", logo: devicon("tailwindcss", "plain") },
      { name: "HTML / CSS", level: 4, category: "frontend", logo: devicon("html5") },
      { name: "Framer Motion", level: 2, category: "frontend", logo: icon("✨") },
    ],
  },

  {
    id: "backend",
    labelFr: "Backend",
    labelEn: "Backend",
    skills: [
      { name: "Laravel", level: 3, category: "backend", logo: devicon("laravel", "plain") },
      { name: "PHP", level: 3, category: "backend", logo: devicon("php") },
      { name: "MySQL", level: 3, category: "backend", logo: devicon("mysql") },
      { name: "REST API", level: 3, category: "backend", logo: icon("🔗") },
    ],
  },

  {
    id: "mobile",
    labelFr: "Mobile",
    labelEn: "Mobile",
    skills: [
      { name: "React Native", level: 3, category: "mobile", logo: devicon("react") },
      { name: "Expo", level: 2, category: "mobile", logo: icon("📱") },
      { name: "SQLite", level: 2, category: "mobile", logo: devicon("sqlite") },
    ],
  },

  {
    id: "tools",
    labelFr: "Outils",
    labelEn: "Tools",
    skills: [
      { name: "Git", level: 4, category: "tools", logo: devicon("git") },
      { name: "GitHub", level: 4, category: "tools", logo: devicon("github") },
      { name: "Figma", level: 2, category: "tools", logo: devicon("figma") },
      { name: "Docker", level: 1, category: "tools", logo: devicon("docker", "plain") },
    ],
  },

  {
    id: "languages",
    labelFr: "Langages",
    labelEn: "Languages",
    skills: [
      { name: "JavaScript", level: 4, category: "languages", logo: devicon("javascript") },
      { name: "C / C++", level: 3, category: "languages", logo: devicon("c") },
      { name: "Python", level: 2, category: "languages", logo: devicon("python") },
    ],
  },

  {
    id: "softskills",
    labelFr: "Soft skills",
    labelEn: "Soft skills",
    skills: [
      { name: "Problem solving", level: 3, category: "softskills", logo: icon("🧠") },
      { name: "Team collaboration", level: 4, category: "softskills", logo: icon("👥") },
      { name: "Autonomy", level: 5, category: "softskills", logo: icon("⚡") },
      { name: "Communication", level: 4, category: "softskills", logo: icon("💬") },
      { name: "Adaptability", level: 4, category: "softskills", logo: icon("🔄") },
    ],
  },
];

export const levelLabel = (
  level: number,
  t: (key: string) => string
): string => {
  return t(`skills.levels.${level}`);
};