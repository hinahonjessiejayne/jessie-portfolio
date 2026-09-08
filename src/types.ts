import type { LucideIcon } from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export type ProjectCategory = 'N8N' | 'Zapier' | 'GHL' | 'Apps & AI';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  imageUrl: string;
  link?: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  website: string;
}
