export interface Resource {
  slug: string;
  title: string;
  desc: string;
  type: 'template' | 'guide' | 'checklist' | 'calculator' | 'framework';
  category: string;
  downloadLabel: string;
  featured: boolean;
  tags: string[];
}

export const resources: Resource[] = [
  {
    slug: 'workflow-audit-template',
    title: 'Workflow Audit Template',
    desc: 'A structured Notion template to map any workflow, identify automation opportunities, and score them by impact and effort.',
    type: 'template',
    category: 'Audit',
    downloadLabel: 'Get Template',
    featured: true,
    tags: ['Notion', 'Workflow', 'Audit'],
  },
  {
    slug: 'automation-roi-calculator',
    title: 'Automation ROI Calculator',
    desc: 'Enter your hourly rate, task frequency, and time per task. Get an instant estimate of annual time and cost savings.',
    type: 'calculator',
    category: 'Strategy',
    downloadLabel: 'Open Calculator',
    featured: true,
    tags: ['ROI', 'Calculator', 'Planning'],
  },
  {
    slug: 'content-repurposing-playbook',
    title: 'Content Repurposing Playbook',
    desc: 'The exact prompts, workflow, and scheduling system we use to turn one piece of content into ten platform-specific outputs.',
    type: 'guide',
    category: 'Content',
    downloadLabel: 'Get Playbook',
    featured: true,
    tags: ['Content', 'Social Media', 'Prompts'],
  },
  {
    slug: 'automation-readiness-checklist',
    title: 'Automation Readiness Checklist',
    desc: '10 questions to answer before you build any automation. Covers triggers, outcomes, data, failure modes, and ownership.',
    type: 'checklist',
    category: 'Strategy',
    downloadLabel: 'Get Checklist',
    featured: false,
    tags: ['Checklist', 'Planning', 'Strategy'],
  },
  {
    slug: 'personal-os-starter-kit',
    title: 'Personal OS Starter Kit',
    desc: 'Templates and setup instructions for a morning briefing, capture system, finance tracker, and weekly review in Notion.',
    type: 'template',
    category: 'Personal',
    downloadLabel: 'Get Kit',
    featured: false,
    tags: ['Personal', 'Notion', 'Productivity'],
  },
  {
    slug: 'ai-agent-decision-framework',
    title: 'AI Agent Decision Framework',
    desc: 'A one-page framework for deciding when to use rule-based automation vs AI agents vs human judgment in any workflow.',
    type: 'framework',
    category: 'AI Tools',
    downloadLabel: 'Get Framework',
    featured: false,
    tags: ['AI Agents', 'Framework', 'Strategy'],
  },
  {
    slug: 'crm-automation-blueprint',
    title: 'CRM Automation Blueprint',
    desc: 'The architecture for automating lead capture, enrichment, follow-up triggers, and reporting for teams of 1-10.',
    type: 'guide',
    category: 'Business',
    downloadLabel: 'Get Blueprint',
    featured: false,
    tags: ['CRM', 'Sales', 'Business'],
  },
  {
    slug: 'sop-writing-template',
    title: 'SOP Writing Template',
    desc: 'A structured template for documenting any repeatable process. Includes trigger, steps, decision points, and ownership fields.',
    type: 'template',
    category: 'Operations',
    downloadLabel: 'Get Template',
    featured: false,
    tags: ['SOP', 'Documentation', 'Operations'],
  },
];

export const resourceCategories = ['All', 'Audit', 'Strategy', 'Content', 'Personal', 'Business', 'AI Tools', 'Operations'];
export const resourceTypes = ['template', 'guide', 'checklist', 'calculator', 'framework'] as const;
