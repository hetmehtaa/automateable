import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Badge } from '../design-system';
import { blogPosts } from '../data/blog';
import { IconArrowLeft, IconClock, IconArrowRight } from '../design-system';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3);

  return (
    <PageLayout title={post.title}>
      {/* Article header */}
      <section style={{ padding: 'var(--space-16) 0 var(--space-10)', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 'var(--space-8)', fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
              <IconArrowLeft size={14} color="currentColor" /> All posts
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)', flexWrap: 'wrap' }}>
              <Badge variant="primary">{post.category}</Badge>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                <IconClock size={11} color="currentColor" /> {post.readTime}
              </span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{post.date}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(var(--text-2xl), 3.5vw, var(--text-5xl))', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)', color: 'var(--text-primary)', marginBottom: 'var(--space-5)' }}>
              {post.title}
            </h1>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ padding: 'var(--space-12) 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <ArticleContent content={post.content} />
          </motion.div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-12)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--border-color)' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 600, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', borderRadius: 'var(--radius-full)', padding: '3px 10px' }}>
                # {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'var(--space-12) 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ background: 'var(--color-ink-900)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>
                Ready to build this for your workflow?
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.5)' }}>
                Start with an audit. We diagnose before we build.
              </div>
            </div>
            <Link to="/#audit" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '44px', padding: '0 22px', background: 'white', color: 'var(--color-ink-900)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all var(--transition-fast)' }}>
              Book an Audit <IconArrowRight size={14} color="currentColor" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section style={{ padding: 'var(--space-16) 0' }}>
          <div className="container" style={{ maxWidth: '760px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>Related posts</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {related.map(p => (
                <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <motion.div whileHover={{ x: 4 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-5)', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', gap: 'var(--space-4)' }}>
                    <div>
                      <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{p.title}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'flex', gap: 'var(--space-3)' }}>
                        <span>{p.category}</span><span>{p.readTime}</span>
                      </div>
                    </div>
                    <IconArrowRight size={16} color="var(--text-muted)" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

const ArticleContent: React.FC<{ content: string }> = ({ content }) => {
  const blocks = content.split('\n\n').filter(Boolean);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {blocks.map((block, i) => {
        if (block.startsWith('## ')) {
          return (
            <h2 key={i} style={{ fontSize: 'clamp(var(--text-xl), 2vw, var(--text-2xl))', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: 'var(--tracking-snug)', marginTop: 'var(--space-4)' }}>
              {block.replace('## ', '')}
            </h2>
          );
        }
        if (block.startsWith('**') && block.endsWith('**')) {
          return (
            <p key={i} style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 'var(--leading-relaxed)' }}>
              {block.replace(/\*\*/g, '')}
            </p>
          );
        }
        if (block.match(/^\*\*.*\*\*/)) {
          const parts = block.split(/(\*\*[^*]+\*\*)/g);
          return (
            <p key={i} style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              {parts.map((part, j) => part.startsWith('**') ? <strong key={j} style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{part.replace(/\*\*/g, '')}</strong> : part)}
            </p>
          );
        }
        if (block.startsWith('- ')) {
          const items = block.split('\n').filter(l => l.startsWith('- '));
          return (
            <ul key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingLeft: '0', listStyle: 'none' }}>
              {items.map((item, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', flexShrink: 0, marginTop: '9px' }} />
                  {item.replace('- ', '')}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
            {block}
          </p>
        );
      })}
    </div>
  );
};

export default BlogPostPage;
