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

export const PROJECT_CATEGORIES: ProjectCategory[] = ['N8N', 'Zapier', 'GHL'];

export const PROJECTS: Project[] = [
  {
    id: 'n8n-1',
    title: 'AI Social Media Content Creator',
    category: 'N8N',
    description:
      'An automated workflow that generates and posts weather updates to your social media platforms (e.g., Facebook Page) at your preferred time and day, utilizing AI to craft engaging content based on real-time data.',
    imageUrl: 'https://i.imgur.com/wVYYzW8.jpg',
  },
  {
    id: 'n8n-2',
    title: 'AI Appointment Setter',
    category: 'N8N',
    description:
      'An intelligent automation system where an AI Agent handles booking appointments via call, including the scheduling, updating, and cancellation of appointments.',
    imageUrl: 'https://i.imgur.com/2Ya0rdm.jpg',
  },
  {
    id: 'zap-1',
    title: 'AI Content Repurposing',
    category: 'Zapier',
    description:
      'A creative automation system that generates random, unique content pieces and publishes them to LinkedIn, Facebook, or other social media platforms, ensuring a consistent and active online presence.',
    imageUrl: 'https://i.imgur.com/1ZIxF49.jpg',
  },
  {
    id: 'zap-2',
    title: 'Asana CRM Automation',
    category: 'Zapier',
    description:
      'Setting up 5 key automations to improve workflow efficiency and ensuring consistent communication with possible leads.',
    imageUrl: 'https://i.imgur.com/0eNqmpH.jpg',
  },
  {
    id: 'zap-3',
    title: 'Webhook: Lead Automation',
    category: 'Zapier',
    description:
      'Automate lead qualification process that can notify a specific department and send an automated email using LLM.',
    imageUrl: 'https://i.imgur.com/Gdo5uWb.png',
  },
  {
    id: 'zap-4',
    title: 'Email Notification: Daily',
    category: 'Zapier',
    description: 'Send Daily Email',
    imageUrl: 'https://i.imgur.com/UGk29D4.png',
  },
  {
    id: 'zap-5',
    title: 'Email Notification: Weekly',
    category: 'Zapier',
    description: 'Send Weekly Email',
    imageUrl: 'https://i.imgur.com/FtTRf1H.png',
  },
  {
    id: 'ghl-1',
    title: 'Client Notification: Lead Magnet Email',
    category: 'GHL',
    description:
      'Send Email notification to a specific department for a potential client',
    imageUrl: 'https://i.imgur.com/DJLEaB6.png',
  },
  {
    id: 'ghl-2',
    title: 'Appointment Booking Reminder',
    category: 'GHL',
    description: 'Send Email reminders day before and 1 hour of the appointment',
    imageUrl: 'https://i.imgur.com/WPfmkH0.png',
  },
  {
    id: 'ghl-3',
    title: 'Facebook Auto Comment and Direct Message',
    category: 'GHL',
    description:
      'Auto response on Facebook page comment/like the posted comment and send a Direct Message',
    imageUrl: 'https://i.imgur.com/7GYK1KK.png',
  },
  {
    id: 'ghl-4',
    title: 'Client Notification: Appointment & SMS Reminders',
    category: 'GHL',
    description:
      'Send Email reminders day before, 1 hour and 5 minutes before the appointment and SMS reminder',
    imageUrl: 'https://i.imgur.com/vyzerBH.png',
  },
  {
    id: 'ghl-5',
    title: 'Sample Webpage',
    category: 'GHL',
    description: 'Ice Cream Shop Page',
    imageUrl: 'https://i.imgur.com/Bteqfba.png',
    link: 'https://app.gohighlevel.com/v2/preview/uJnrBWhFYue2S1jXGNLa?notrack=true',
  },
];

export const SCHEDULER_URL = 'https://schedule.fillout.com/t/3Rgh4t69LFus';
