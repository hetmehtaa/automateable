import { useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';
import type { SEOMeta } from '../hooks/useSEO';

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  seo?: SEOMeta;
}

const pageSEO: Record<string, SEOMeta> = {
  '/':                    { title: 'Turn Messy Workflows Into Automated Systems', description: 'Automation consulting, AI agents, and custom tools for founders, creators, and small businesses. Fixed-scope audits from $497. Diagnosis before building.', canonical: '/' },
  '/services':            { title: 'Automation Services', description: 'Six automation services: consulting, AI agents, tool implementation, social media automation, personal automation, and business process automation.', canonical: '/services' },
  '/audit':               { title: 'Automation Audit', description: 'Fixed-scope workflow audit from $497. Get a workflow map, automation opportunity report, tool recommendations, and implementation roadmap in 3-5 days.', canonical: '/audit' },
  '/tools':               { title: 'AI Tools & Automation Products', description: 'Productized AI tools for specific workflows: content repurposing, meeting-to-action, research agents, CRM automation, and more.', canonical: '/tools' },
  '/use-cases':           { title: 'Use Cases & Workflow Examples', description: 'Automation use cases for founders, creators, small businesses, professionals, and teams. Real workflows, real outcomes.', canonical: '/use-cases' },
  '/personas':            { title: 'Who We Work With', description: 'Detailed workflow breakdowns for founders, content creators, operators, consultants, and small business owners. See your day-in-the-life and what changes.', canonical: '/personas' },
  '/automation-resources':{ title: 'Automation & AI Resources', description: 'Curated list of the best automation tools, courses, communities, templates, newsletters, and YouTube channels. No affiliate links.', canonical: '/automation-resources' },
  '/pricing':             { title: 'Pricing & Engagement Models', description: 'Three engagement models: Automation Audit (from $497), Build Sprint (project-based), and Automation Retainer (monthly). Fixed scope, honest pricing.', canonical: '/pricing' },
  '/about':               { title: 'About automateable', description: 'Part consulting firm, part automation lab, part AI product studio. We exist because systems beat tools. Diagnose before building, always.', canonical: '/about' },
  '/blog':                { title: 'Automation Field Notes', description: 'Practical automation writing from people who build systems professionally. Workflow teardowns, AI agents, creator systems, and operations.', canonical: '/blog' },
  '/contact':             { title: 'Start a Project', description: 'Tell us your workflow problem. We will map the system that solves it. Fast response, no pitch calls, diagnosis first.', canonical: '/contact' },
  '/resources':           { title: 'Free Automation Resources', description: 'Free templates, calculators, checklists, and guides for automation planning and implementation.', canonical: '/resources' },
};

const defaultSEO: SEOMeta = {
  title: 'automateable',
  description: 'Automation consulting, AI agents, and custom workflow tools.',
  canonical: '/',
};

export const PageLayout: React.FC<Props> = ({ children, title, seo }) => {
  const path = window.location.pathname;
  const meta = seo ?? pageSEO[path] ?? { ...defaultSEO, title: title ?? defaultSEO.title };

  useSEO(meta);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [path]);

  return <>{children}</>;
};

export default PageLayout;
