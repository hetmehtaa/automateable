# automateable

Part consulting firm. Part automation lab. Part AI product studio.

## Brand Strategy

**Core positioning:** "Tell us the problem. We'll build the system that solves it."

**Supporting line:** We design automation workflows, AI agents, and custom tools for work, life, business, and social media -- so repetitive chaos turns into repeatable systems.

**Belief:** Most people don't need more apps. They need better systems.

**Tone:** Direct, intelligent, premium, practical. No buzzword soup. No generic AI hype.

## Target Users

- Founders managing too many tools with no single view of the business
- Creators drowning in manual content work with no repurposing system
- Small businesses with slow follow-ups and manual reporting
- Consultants and professionals spending hours on automatable work
- Teams with broken handoffs and no shared workflow standards
- Individuals with chaotic personal admin and no system for life

## Service Model

1. Automation Consulting -- Workflow audit, diagnosis, opportunity mapping
2. Custom AI Agents -- Task-specific agents for research, reporting, content, ops
3. AI Tool Implementation -- Connect existing tools into working systems
4. Social Media Automation -- Full content pipeline from idea to analytics
5. Personal Automation -- Daily briefing, finance, knowledge capture, life admin
6. Business Process Automation -- Dashboards, triggers, document processing

## Product Model

Productized AI tools: Content Repurposer, Meeting-to-Action Bot, Personal Research Agent,
Social Media Idea Engine, Workflow Mapper, Daily Briefing Agent, CRM Follow-up Assistant,
Invoice/Doc Extractor, SOP Generator, Founder Command Center.

## Conversion Strategy

Primary CTA: Book an Automation Audit
Secondary CTA: Explore AI Tools
Tertiary: Submit your problem (contact form)

Flow: Problem awareness -> Workflow diagnosis -> Automation audit -> Build sprint -> Retainer

## Design System

Tokens: src/styles/tokens.css (colors, typography, spacing, radius, shadows, transitions)
Global: src/styles/global.css (reset, utilities, animations, layout primitives)
Components: src/design-system/ (Button, Badge, Card, SectionHeader, FormFields, MetricCard,
ProcessStep, Skeleton, EmptyState, ErrorState)

## How to Run Locally

    npm install
    npm run dev

Build for production:

    npm run build
    npm run preview

## Project Structure

    src/
      styles/
        tokens.css       Design tokens
        global.css       Global styles and utilities
      design-system/
        Button.tsx
        Badge.tsx
        Card.tsx
        SectionHeader.tsx
        FormFields.tsx   Input, Textarea, Select
        MetricCard.tsx
        ProcessStep.tsx
        Skeleton.tsx
        StateBlocks.tsx  EmptyState, ErrorState
        index.ts         Barrel exports
      sections/
        Navbar.tsx
        Hero.tsx
        TrustStrip.tsx
        ProblemCategories.tsx
        HowItWorks.tsx
        Services.tsx
        ToolMarketplace.tsx
        AuditSection.tsx
        UseCases.tsx
        BeforeAfter.tsx
        SocialMediaPipeline.tsx
        PersonalOS.tsx
        BusinessCommandCenter.tsx
        Pricing.tsx
        FAQ.tsx
        About.tsx
        CTASection.tsx
        ContactForm.tsx
        Footer.tsx
      App.tsx
      main.tsx
