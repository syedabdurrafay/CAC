export type ServiceCategory = "Earned Media" | "Paid Media" | "Owned Media";

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  description: string;
  heroStat?: {
    value: string;
    label: string;
  };
  problem: string;
  solution: string;
  benefits: string[];
  deliverables: string[];
  process: ServiceProcessStep[];
  faqs: ServiceFAQ[];
  relatedSlugs: string[];
}

export interface Project {
  slug: string;
  name: string;
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  solutionText: string;
  servicesUsed: string[];
  results: {
    label: string;
    value: string;
  }[];
  image: string;
  isPlaceholder?: boolean;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
  twitter?: string;
  isPlaceholder?: boolean;
}

export interface InsightPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  body: string[];
}

export interface NavLink {
  label: string;
  href: string;
}
