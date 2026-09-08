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

export const PROFILE_IMAGE =
  'https://lh3.googleusercontent.com/d/18EafyH0BU_s_OWzlVp303Y3E3lgKScnQ';

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

export const PROJECT_CATEGORIES: ProjectCategory[] = ['N8N', 'Zapier', 'GHL', 'Apps & AI'];

export const PROJECTS: Project[] = [
  {
    id: 'n8n-1',
    title: 'AI Social Media Content Creator',
    category: 'N8N',
    description:
      'An automated workflow that generates and posts weather updates to your social media platforms (e.g., Facebook Page) at your preferred time and day, utilizing AI to craft engaging content based on real-time data.',
    imageUrl: '/work/n8n-1.png',
  },
  {
    id: 'n8n-2',
    title: 'AI Appointment Setter',
    category: 'N8N',
    description:
      'An intelligent automation system where an AI Agent handles booking appointments via call, including the scheduling, updating, and cancellation of appointments.',
    imageUrl: '/work/n8n-2.png',
  },
  {
    id: 'zap-1',
    title: 'AI Content Repurposing',
    category: 'Zapier',
    description:
      'A creative automation system that generates random, unique content pieces and publishes them to LinkedIn, Facebook, or other social media platforms, ensuring a consistent and active online presence.',
    imageUrl: '/work/zap-1.png',
  },
  {
    id: 'zap-2',
    title: 'Asana CRM Automation',
    category: 'Zapier',
    description:
      'Setting up 5 key automations to improve workflow efficiency and ensuring consistent communication with possible leads.',
    imageUrl: '/work/zap-2.png',
  },
  {
    id: 'zap-3',
    title: 'Webhook: Lead Automation',
    category: 'Zapier',
    description:
      'Automate lead qualification process that can notify a specific department and send an automated email using LLM.',
    imageUrl: '/work/zap-3.png',
  },
  {
    id: 'zap-4',
    title: 'Email Notification: Daily',
    category: 'Zapier',
    description: 'Send Daily Email',
    imageUrl: '/work/zap-4.png',
  },
  {
    id: 'zap-5',
    title: 'Email Notification: Weekly',
    category: 'Zapier',
    description: 'Send Weekly Email',
    imageUrl: '/work/zap-5.png',
  },
  {
    id: 'ghl-1',
    title: 'Client Notification: Lead Magnet Email',
    category: 'GHL',
    description:
      'Send Email notification to a specific department for a potential client',
    imageUrl: '/work/ghl-1.png',
  },
  {
    id: 'ghl-2',
    title: 'Appointment Booking Reminder',
    category: 'GHL',
    description: 'Send Email reminders day before and 1 hour of the appointment',
    imageUrl: '/work/ghl-2.png',
  },
  {
    id: 'ghl-3',
    title: 'Facebook Auto Comment and Direct Message',
    category: 'GHL',
    description:
      'Auto response on Facebook page comment/like the posted comment and send a Direct Message',
    imageUrl: '/work/ghl-3.png',
  },
  {
    id: 'ghl-4',
    title: 'Client Notification: Appointment & SMS Reminders',
    category: 'GHL',
    description:
      'Send Email reminders day before, 1 hour and 5 minutes before the appointment and SMS reminder',
    imageUrl: '/work/ghl-4.png',
  },
  {
    id: 'ghl-5',
    title: 'Sample Webpage',
    category: 'GHL',
    description: 'Ice Cream Shop Page',
    imageUrl: '/work/ghl-5.png',
    link: 'https://app.gohighlevel.com/v2/preview/uJnrBWhFYue2S1jXGNLa?notrack=true',
  },
  {
    id: 'ghl-6',
    title: 'Real Estate Brand Hub',
    category: 'GHL',
    description:
      'Four-page GoHighLevel brand hub for a Metro Manila real-estate brokerage: hub, property pages and lead capture wired straight into the CRM pipeline. Client work; details blurred for confidentiality.',
    imageUrl: '/work/diana-main-hub.png',
  },
  {
    id: 'ghl-7',
    title: 'Property Launch Funnel',
    category: 'GHL',
    description:
      'Single-paste GoHighLevel funnel for a residential development launch: hero, unit gallery, enquiry form and booking flow, all scoped under one root. Client work; details blurred for confidentiality.',
    imageUrl: '/work/nila-residences.png',
  },
  {
    id: 'pos-1',
    title: 'QA: Point-of-Sale Admin System',
    category: 'Apps & AI',
    description:
      'Quality assurance on a client point-of-sale admin system: test plan written against the requirements, end-to-end passes across invoicing, stock and customer flows, defect reports with reproduction steps, and regression checks before release. Client build; my role was QA. Details blurred for confidentiality.',
    imageUrl: '/work/pos-dashboard.png',
  },
  {
    id: 'ai-1',
    title: 'Ask My AI: Conversational Portfolio',
    category: 'Apps & AI',
    description:
      'A portfolio you talk to. Next.js 14 with the Vercel AI SDK and Groq; the assistant swaps live React components into the stream mid-answer to show the relevant work instead of describing it.',
    imageUrl: '/work/ai-avatar.png',
    link: 'https://ai.jessiecalm.com',
  },
  {
    id: 'raven-1',
    title: 'Raven: AI Agent Council Dashboard',
    category: 'Apps & AI',
    description:
      'Live ops view of a multi-agent AI team: who is online, who is working on what, one week at a time. A Python standard-library server reading local state only: no network, no model calls, zero tokens.',
    imageUrl: '/work/raven-dashboard.png',
  },
  {
    id: 'scraper-1',
    title: 'Unattended Browser Automation',
    category: 'Apps & AI',
    description:
      'A Playwright job that logs in through a real form, walks a paginated dataset, writes atomic CSV and JSON, and runs itself nightly under launchd with selector-drift warnings and failure alerts. No human in the loop.',
    imageUrl: '/work/scraper-run.png',
    link: 'https://github.com/hinahonjessiejayne/unattended-scraper',
  },
  {
    id: 'grocal-1',
    title: 'GroCal: Grocery Budget App',
    category: 'Apps & AI',
    description:
      'Offline-first grocery budgeting app for Philippine shoppers: carts, per-store price tracking, reusable list templates and currency conversion. Expo, React Native and TypeScript.',
    imageUrl: '/work/grocal.png',
  },
  {
    id: 'ulam-1',
    title: 'Ma, Anong Ulam?: Recipe App',
    category: 'Apps & AI',
    description:
      'A fully offline Filipino recipe app: browse by category, search by dish or by ingredient. Expo, React Native and TypeScript, with a web build.',
    imageUrl: '/work/ma-anong-ulam.png',
  },
];

export const SCHEDULER_URL = 'https://schedule.fillout.com/t/3Rgh4t69LFus';
