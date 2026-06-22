import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { Footer } from '../sections/Footer';

type Category = 'All' | 'Learning' | 'Tools' | 'Communities' | 'Templates' | 'Newsletters' | 'Courses' | 'YouTube';

interface Resource {
  title: string;
  desc: string;
  url: string;
  category: Category;
  tag: string;
  free: boolean;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All levels';
}

const resources: Resource[] = [
  // Learning
  { title: 'n8n Documentation', desc: 'The official docs for n8n, the most powerful open-source workflow automation platform. Start here if you want to self-host automations.', url: 'https://docs.n8n.io', category: 'Learning', tag: 'Docs', free: true, level: 'All levels' },
  { title: 'Zapier Learn', desc: 'Zapier\'s official learning hub covering automation fundamentals, use cases, and platform tutorials for non-technical users.', url: 'https://zapier.com/learn', category: 'Learning', tag: 'Tutorial', free: true, level: 'Beginner' },
  { title: 'Make (Integromat) Academy', desc: 'Structured courses from Make covering scenario building, data transformation, and advanced automation patterns.', url: 'https://academy.make.com', category: 'Courses', tag: 'Course', free: true, level: 'All levels' },
  { title: 'Anthropic Prompt Engineering Guide', desc: 'The definitive guide to writing effective prompts for Claude and LLMs. Essential for anyone building AI agents.', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', category: 'Learning', tag: 'Guide', free: true, level: 'Intermediate' },
  { title: 'LangChain Documentation', desc: 'Framework for building applications with LLMs. The go-to resource for building chains, agents, and retrieval systems.', url: 'https://python.langchain.com/docs', category: 'Learning', tag: 'Docs', free: true, level: 'Advanced' },
  { title: 'OpenAI Cookbook', desc: 'Practical examples and guides for using OpenAI models in production. Covers function calling, embeddings, and agent patterns.', url: 'https://cookbook.openai.com', category: 'Learning', tag: 'Examples', free: true, level: 'Intermediate' },

  // Tools
  { title: 'n8n', desc: 'Open-source workflow automation tool with 400+ integrations. Self-hostable, visual node editor, supports code nodes for complex logic.', url: 'https://n8n.io', category: 'Tools', tag: 'Automation', free: true, level: 'All levels' },
  { title: 'Make (Integromat)', desc: 'Visual automation platform with powerful data transformation. More flexible than Zapier for complex multi-step scenarios.', url: 'https://make.com', category: 'Tools', tag: 'Automation', free: true, level: 'All levels' },
  { title: 'Zapier', desc: 'The most widely used automation tool. Best for simple, reliable integrations between popular SaaS apps. 6,000+ app integrations.', url: 'https://zapier.com', category: 'Tools', tag: 'Automation', free: true, level: 'Beginner' },
  { title: 'Airtable', desc: 'Database + spreadsheet hybrid. The backbone of many automation stacks for storing, structuring, and triggering off data.', url: 'https://airtable.com', category: 'Tools', tag: 'Database', free: true, level: 'All levels' },
  { title: 'Notion', desc: 'Knowledge base, project management, and database tool. Central hub for many personal and team automation systems.', url: 'https://notion.so', category: 'Tools', tag: 'Productivity', free: true, level: 'All levels' },
  { title: 'Clay', desc: 'Data enrichment and outbound automation platform. Best-in-class for sales and GTM workflows that need rich contact data.', url: 'https://clay.com', category: 'Tools', tag: 'Sales', free: false, level: 'Intermediate' },
  { title: 'Apify', desc: 'Web scraping and data extraction platform. Build scrapers without infrastructure Ã¢ useful for research automation workflows.', url: 'https://apify.com', category: 'Tools', tag: 'Scraping', free: true, level: 'Intermediate' },
  { title: 'Pipedream', desc: 'Developer-first workflow automation. Write Node.js/Python code steps between API calls. More powerful than Zapier for developers.', url: 'https://pipedream.com', category: 'Tools', tag: 'Developer', free: true, level: 'Advanced' },
  { title: 'Retool', desc: 'Build internal tools and dashboards connected to any database or API. Replaces dozens of manual reporting workflows.', url: 'https://retool.com', category: 'Tools', tag: 'Internal Tools', free: true, level: 'Intermediate' },
  { title: 'Dify', desc: 'Open-source LLM app development platform. Build AI agents, chatbots, and automation pipelines with a visual workflow editor.', url: 'https://dify.ai', category: 'Tools', tag: 'AI Agents', free: true, level: 'Intermediate' },
  { title: 'Flowise', desc: 'Open-source UI for building LangChain flows. Drag-and-drop AI agent builder that runs locally or self-hosted.', url: 'https://flowiseai.com', category: 'Tools', tag: 'AI Agents', free: true, level: 'Intermediate' },

  // Newsletters
  { title: 'The Automation Consultant (Ben Gremillion)', desc: 'Weekly practical automation breakdowns. Real workflows, real problems, real solutions. No hype.', url: 'https://ben.substack.com', category: 'Newsletters', tag: 'Newsletter', free: true, level: 'All levels' },
  { title: 'AI Breakfast', desc: 'Daily AI news and tool updates curated for practitioners, not academics. Concise, useful, no fluff.', url: 'https://aibreakfast.beehiiv.com', category: 'Newsletters', tag: 'Newsletter', free: true, level: 'All levels' },
  { title: 'TLDR AI', desc: 'The most efficient AI and ML news digest. Technical but accessible. Daily brief covering models, tools, and research.', url: 'https://tldr.tech/ai', category: 'Newsletters', tag: 'Newsletter', free: true, level: 'Intermediate' },
  { title: 'The Neuron', desc: 'AI tools and workflows for business users. Practical focus on productivity and automation rather than research.', url: 'https://www.theneurondaily.com', category: 'Newsletters', tag: 'Newsletter', free: true, level: 'Beginner' },
  { title: 'Lenny\'s Newsletter', desc: 'Product and growth insights including automation and systems for operators and founders. Paid tier worth it.', url: 'https://www.lennysnewsletter.com', category: 'Newsletters', tag: 'Newsletter', free: true, level: 'All levels' },

  // Communities
  { title: 'n8n Community', desc: 'Active forum for n8n users. Workflow templates, error help, and integration tips from thousands of practitioners.', url: 'https://community.n8n.io', category: 'Communities', tag: 'Forum', free: true, level: 'All levels' },
  { title: 'Make Community', desc: 'Official Make.com community forum with scenario templates, use cases, and integration guides.', url: 'https://community.make.com', category: 'Communities', tag: 'Forum', free: true, level: 'All levels' },
  { title: 'Zapier Community', desc: 'Large community of Zapier users sharing Zaps, troubleshooting errors, and discussing best practices.', url: 'https://community.zapier.com', category: 'Communities', tag: 'Forum', free: true, level: 'Beginner' },
  { title: 'AI Jason Discord', desc: 'Active community around AI automation and agent building. Real practitioners sharing workflows and tools.', url: 'https://discord.gg/aijason', category: 'Communities', tag: 'Discord', free: true, level: 'Intermediate' },
  { title: 'Indie Hackers', desc: 'Community of founders building products, many using automation. Good for workflow teardowns and tool discussions.', url: 'https://www.indiehackers.com', category: 'Communities', tag: 'Community', free: true, level: 'All levels' },

  // YouTube
  { title: 'AI Jason (YouTube)', desc: 'Best YouTube channel for practical AI automation workflows. Covers n8n, LangChain, agents, and real business use cases.', url: 'https://www.youtube.com/@AIJasonZ', category: 'YouTube', tag: 'YouTube', free: true, level: 'Intermediate' },
  { title: 'Liam Ottley (YouTube)', desc: 'AI agency and automation business content. Good for understanding how to package and sell automation services.', url: 'https://www.youtube.com/@LiamOttley', category: 'YouTube', tag: 'YouTube', free: true, level: 'All levels' },
  { title: 'Corbin Brown (YouTube)', desc: 'Practical n8n tutorials and AI workflow builds. Clear, well-structured, technically solid.', url: 'https://www.youtube.com/@CorbinBrown', category: 'YouTube', tag: 'YouTube', free: true, level: 'Intermediate' },
  { title: 'David Ondrej (YouTube)', desc: 'AI automation workflows for business. Focus on practical applications that save real time.', url: 'https://www.youtube.com/@DavidOndrej', category: 'YouTube', tag: 'YouTube', free: true, level: 'All levels' },

  // Templates
  { title: 'n8n Template Library', desc: '700+ workflow templates across categories. Start from a working example and customize rather than building from scratch.', url: 'https://n8n.io/workflows', category: 'Templates', tag: 'Templates', free: true, level: 'All levels' },
  { title: 'Make Template Gallery', desc: 'Official Make scenario templates organized by app and use case. Covers 500+ common automation patterns.', url: 'https://www.make.com/en/templates', category: 'Templates', tag: 'Templates', free: true, level: 'All levels' },
  { title: 'Airtable Universe', desc: 'Community-built Airtable base templates for project management, CRM, content planning, and operations.', url: 'https://www.airtable.com/universe', category: 'Templates', tag: 'Templates', free: true, level: 'Beginner' },
  { title: 'Notion Template Gallery', desc: 'Thousands of Notion templates for personal and team workflows. Many designed as the foundation for automation.', url: 'https://www.notion.so/templates', category: 'Templates', tag: 'Templates', free: true, level: 'Beginner' },
];

const categories: Category[] = ['All', 'Tools', 'Learning', 'Templates', 'Newsletters', 'YouTube', 'Communities', 'Courses'];

const levelColors: Record<string, string> = {
  Beginner:     'var(--green)',
  Intermediate: 'var(--blue)',
  Advanced:     'var(--amber)',
  'All levels': 'var(--ink-3)',
};

export const AutomationResourcesPage: React.FC = () => {
  const [cat, setCat] = useState<Category>('All');
  const [search, setSearch] = useState('');

  const filtered = resources.filter(r => {
    const catMatch = cat === 'All' || r.category === cat;
    const searchMatch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase()) || r.tag.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <PageLayout title="Automation & AI Resources">
      {/* Header */}
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--border)', padding: 'clamp(56px,8vw,96px) 0 clamp(32px,4vw,48px)' }}>
        <div className="w">
          <div className="label" style={{ marginBottom: 16 }}>Automation resources</div>
          <h1 style={{ fontSize: 'clamp(var(--f40),6vw,var(--f72))', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.0, color: 'var(--ink-0)', marginBottom: 20, maxWidth: 720 }}>
            Every tool, course, and<br />
            <span className="g-text-blue">community worth your time.</span>
          </h1>
          <p style={{ fontSize: 'var(--f16)', color: 'var(--ink-2)', maxWidth: 560, lineHeight: 1.7, marginBottom: 32 }}>
            Curated by people who build automation systems professionally. No affiliate links. No padding. Just the resources we actually use and recommend.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: 'white', border: '1px solid var(--border-2)', borderRadius: 'var(--r-8)', maxWidth: 440 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5.5" stroke="var(--ink-3)" strokeWidth="1.3"/><path d="M11 11l3 3" stroke="var(--ink-3)" strokeWidth="1.3" strokeLinecap="round"/></svg>
            <input type="search" placeholder="Search tools, topics, or categories..." value={search} onChange={e => setSearch(e.target.value)}
              aria-label="Search resources"
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 'var(--f14)', color: 'var(--ink-0)', background: 'transparent' }} />
            {search && <button onClick={() => setSearch('')} style={{ color: 'var(--ink-3)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--f12)' }} aria-label="Clear search">clear</button>}
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <section style={{ background: 'white', borderBottom: '1px solid var(--border)', position: 'sticky', top: 'var(--topbar-h)', zIndex: 50 }}>
        <div className="w" style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 6, paddingBlock: 12, minWidth: 'max-content' }}>
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
                style={{ height: 32, padding: '0 16px', background: cat === c ? 'var(--ink-0)' : 'var(--paper-1)', color: cat === c ? 'var(--paper)' : 'var(--ink-2)', border: `1px solid ${cat === c ? 'var(--ink-0)' : 'var(--border-2)'}`, borderRadius: 'var(--r-full)', fontSize: 'var(--f12)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                {c} {cat === c && cat !== 'All' ? `(${filtered.length})` : ''}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resource grid */}
      <section style={{ background: 'var(--paper)', padding: 'clamp(40px,5vw,64px) 0' }}>
        <div className="w">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--ink-3)' }}>
              <div style={{ fontSize: 'var(--f32)', marginBottom: 12 }}>0</div>
              <div style={{ fontSize: 'var(--f15)' }}>No resources match that search. Try a broader term.</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12 }}>
              {filtered.map((r, i) => (
                <motion.a key={r.title} href={r.url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 9) * 0.04 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20, background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--r-12)', textDecoration: 'none', transition: 'border-color 0.15s, box-shadow 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-3)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--sh-sm)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 'var(--f11)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', background: 'var(--paper-2)', color: 'var(--ink-3)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', padding: '2px 8px' }}>{r.tag}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: levelColors[r.level], fontWeight: 600 }}>{r.level}</span>
                    </div>
                    {r.free && <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f10)', color: 'var(--green)', fontWeight: 700, flexShrink: 0 }}>FREE</span>}
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--f15)', fontWeight: 700, color: 'var(--ink-0)', marginBottom: 6, letterSpacing: '-0.02em' }}>{r.title}</div>
                    <div style={{ fontSize: 'var(--f13)', color: 'var(--ink-2)', lineHeight: 1.6 }}>{r.desc}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 'var(--f12)', color: 'var(--blue)', fontWeight: 600, marginTop: 'auto' }}>
                    Visit resource
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 10L10 1M10 1H4M10 1v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: 'white', borderTop: '1px solid var(--border)', padding: 'clamp(48px,6vw,80px) 0' }}>
        <div className="w w--md" style={{ textAlign: 'center' }}>
          <div className="label" style={{ marginBottom: 12 }}>Need more than resources?</div>
          <h2 style={{ fontSize: 'clamp(var(--f24),3vw,var(--f40))', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--ink-0)', marginBottom: 12 }}>
            We build the systems for you.
          </h2>
          <p style={{ color: 'var(--ink-3)', marginBottom: 28, fontSize: 'var(--f15)', maxWidth: 440, margin: '0 auto 28px' }}>
            Resources teach you what is possible. We build what you actually need, specific to your workflow, tools, and team.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/audit" className="btn btn--lg btn--primary">Book an Automation Audit</Link>
            <Link to="/services" className="btn btn--lg btn--ghost">See what we build</Link>
          </div>
        </div>
      </section>

      <Footer />
    </PageLayout>
  );
};

export default AutomationResourcesPage;
