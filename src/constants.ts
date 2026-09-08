import {
  Briefcase,
  Database,
  Monitor,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type {
  ContactInfo,
  ExperienceItem,
  NavItem,
  Project,
  ProjectCategory,
  Service,
} from './types';
import portfolio from './data/projects.json';

export const PROFILE_IMAGE = '/profile.jpg';

export const PERSONAL_INFO = {
  about:
    'Full-stack Developer and Automation Specialist leveraging AI-assisted software engineering tools (Claude Code, Cursor, GitHub Copilot) to accelerate build cycles, ship clean React/TypeScript applications, and optimize business operations',
  skills: [
    {
      label: 'AI Engineering Tools',
      items:
        'Claude Code, Cursor, GitHub Copilot, Prompt Engineering, AI-Driven Prototyping',
    },
    {
      label: 'Development & Automation',
      items: 'React, Vite, TypeScript, GoHighLevel, n8n, Make, Zapier',
    },
  ],
};

export const CONTACT_INFO: ContactInfo = {
  phone: '+639171205135',
  email: 'hinahonjessiejayne@gmail.com',
  address: 'Paranaque City, Philippines',
  website: 'https://ai.jessiecalm.com/',
};

export const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Experience', href: '#experience' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' },
];

export const SERVICES: Service[] = [
  {
    title: 'Administrative Management',
    description:
      'Overseeing office operations, coordinating procedures, and ensuring compliance with company standards across multiple locations.',
    icon: Briefcase,
  },
  {
    title: 'IT Support & Engineering',
    description:
      'Implementing technology upgrades, managing network connectivity, and ensuring system security and minimal business disruption.',
    icon: Monitor,
  },
  {
    title: 'Quality Assurance',
    description:
      'Developing QA processes, conducting audits, and analyzing data to identify areas for improvement and maintain high standards.',
    icon: ShieldCheck,
  },
  {
    title: 'Team Leadership',
    description:
      'Guiding teams to meet performance targets, fostering collaboration, and supervising administrative staff for peak efficiency.',
    icon: Users,
  },
  {
    title: 'Process Optimization',
    description:
      'Implementing efficient workflows and ensuring consistency in operational processes across various business sites.',
    icon: Settings,
  },
  {
    title: 'Data Analysis',
    description:
      'Analyzing operational data to drive decision-making and improve team performance and business outcomes.',
    icon: Database,
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: '1',
    role: 'Administrative Manager',
    company: 'Corporate Office',
    period: '2021 - 2024',
    description: [
      'Responsible for overseeing administrative operations across three office locations.',
      'Coordinating office procedures, supervising administrative staff, implementing efficient workflows.',
      'Ensuring consistency in processes across all sites and compliance with company policies.',
    ],
  },
  {
    id: '2',
    role: 'IT Site Engineer',
    company: 'Tech Solutions',
    period: '2019 - 2021',
    description: [
      'Implementing technology upgrades and ensuring minimal disruption to business operations.',
      'Managing network connectivity and ensuring system security and uptime.',
      'Providing technical support and troubleshooting for hardware and software issues.',
    ],
  },
  {
    id: '3',
    role: 'Team Leader / Quality Assurance',
    company: 'Accounts: JET.COM, WALMART, WYZE',
    period: '2015 - 2019',
    description: [
      'Responsible for guiding a team to meet performance targets while ensuring high standards of quality.',
      'Developed and implemented QA processes, conducted audits, and analyzed data.',
      'Identified areas for improvement and trained staff on best practices.',
    ],
  },
];

export const EDUCATION = {
  school: 'AMA Computer University',
  campus: 'Makati Main Site',
  period: '2001 - 2005',
  degree: "Bachelor's Degree in Computer Science",
};

/**
 * Projects live in `src/data/projects.json` so the same file can be published
 * as `/portfolio.json` at build time (see `vite.config.ts`) and read by the AI
 * portfolio at ai.jessiecalm.com. Edit the JSON, not this file, to add work.
 */
const CATEGORY_SET: ReadonlySet<string> = new Set<ProjectCategory>(['N8N', 'Zapier', 'GHL', 'Apps & AI']);

const isProjectCategory = (value: string): value is ProjectCategory => CATEGORY_SET.has(value);

const toProject = (raw: (typeof portfolio.projects)[number]): Project => {
  if (!isProjectCategory(raw.category)) {
    throw new Error(`Unknown project category "${raw.category}" on ${raw.id}`);
  }
  return { ...raw, category: raw.category };
};

export const PROJECT_CATEGORIES: ProjectCategory[] = portfolio.categories.filter(isProjectCategory);

export const PROJECTS: Project[] = portfolio.projects.map(toProject);

export const SCHEDULER_URL = 'https://schedule.fillout.com/t/3Rgh4t69LFus';
