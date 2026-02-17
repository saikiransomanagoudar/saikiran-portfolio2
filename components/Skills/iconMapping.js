import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiNodedotjs,
  SiDjango,
  SiFlask,
  SiFastapi,
  SiGraphql,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiJenkins,
  SiKubernetes,
  SiVercel,
  SiHeroku,
  SiGit,
  SiJest,
} from 'react-icons/si'
import {FaJava, FaAws, FaServer} from 'react-icons/fa'
import {GiChainLightning} from 'react-icons/gi'

// Map skill names to their corresponding icons
export const skillIcons = {
  // Languages
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  Java: FaJava,
  HTML: SiHtml5,
  CSS: SiCss3,

  // Frontend
  'React.js': SiReact,
  'Next.js': SiNextdotjs,
  Redux: SiRedux,
  'Tailwind CSS': SiTailwindcss,

  // Backend
  'Node.js': SiNodedotjs,
  Django: SiDjango,
  Flask: SiFlask,
  FastAPI: SiFastapi,
  'RESTful APIs': FaServer,
  GraphQL: SiGraphql,

  // Databases
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Redis: SiRedis,

  // Cloud & DevOps
  AWS: FaAws,
  Docker: SiDocker,
  Jenkins: SiJenkins,
  Kubernetes: SiKubernetes,
  Vercel: SiVercel,
  Heroku: SiHeroku,

  // Tools
  Git: SiGit,
  Jest: SiJest,
  LangChain: GiChainLightning,
}

// Color mapping for each skill icon
export const skillColors = {
  // Languages
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3776AB',
  Java: '#007396',
  HTML: '#E34F26',
  CSS: '#1572B6',

  // Frontend
  'React.js': '#61DAFB',
  'Next.js': '#FFFFFF',
  Redux: '#764ABC',
  'Tailwind CSS': '#06B6D4',

  // Backend
  'Node.js': '#339933',
  Django: '#092E20',
  Flask: '#FFFFFF',
  FastAPI: '#009688',
  'RESTful APIs': '#4CAF50',
  GraphQL: '#E10098',

  // Databases
  PostgreSQL: '#4169E1',
  MySQL: '#4479A1',
  MongoDB: '#47A248',
  Redis: '#DC382D',

  // Cloud & DevOps
  AWS: '#FF9900',
  Docker: '#2496ED',
  Jenkins: '#D24939',
  Kubernetes: '#326CE5',
  Vercel: '#FFFFFF',
  Heroku: '#430098',

  // Tools
  Git: '#F05032',
  Jest: '#C21325',
  LangChain: '#FFD700',
}
