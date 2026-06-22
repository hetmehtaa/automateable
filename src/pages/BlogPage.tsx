import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Footer } from '../sections/Footer';
import { Reveal, StaggerContainer, StaggerItem } from '../components/Reveal';
import { Badge } from '../design-system';
import { blogPosts, blogCategories } from '../data/blog';
import { IconArrowRight, IconClock } from '../design-system';

export const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? blogPosts : blogPosts.filter(p => p.category === activeCategory);
  const featured = blogPosts.filter(p => p.featured);

  return (
    <PageLayout title="Blog">
      {/* Hero */}
      <section style={{ padding: 'var(--space-20) 0 var(--space-12)', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
          <Reveal>
            <div style={{ maxWidth: '640px' }}>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <Badge variant="primary">Blog</Badge>
              </div>
              <h1 style={{ fontSize: 'clamp(var(--text-3xl), 4vw, var(--text-6xl))', fontWeight: 800, letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)', marginBottom: 'var(--space-5)', color: 'var(--text-primary)' }}>
                Practical automation.<br />Real workflows.
              </h1>
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                No hype. No generic AI takes. Just useful frameworks for building systems that actually work.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured posts */}
      {activeCategory === 'All' && (
        <section style={{ padding: 'var(--space-16) 0', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>Featured</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }} className="featured-grid">
              {featured.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.1}>
                  <FeaturedPostCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter + all posts */}
      <section style={{ padding: 'var(--space-16) 0' }}>
        <div className="container" style={{ maxWidth: 'var(--container-xl)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}>
            {blogCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ height: '34px', padding: '0 16px', background: activeCategory === cat ? 'var(--color-ink-900)' : 'var(--bg-elevated)', color: activeCategory === cat ? 'white' : 'var(--text-secondary)', border: `1px solid ${activeCategory === cat ? 'var(--color-ink-900)' : 'var(--border-color)'}`, borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer', transition: 'all var(--transition-fast)' }}>
                {cat}
              </button>
            ))}
          </div>
          <StaggerContainer style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-6)' }} className="posts-grid">
            {(activeCategory === 'All' ? blogPosts : filtered).map(post => (
              <StaggerItem key={post.slug}>
                <PostCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <style>{`
        .featured-grid { grid-template-columns: 1fr 1fr; }
        .posts-grid { grid-template-columns: repeat(3,1fr); }
        @media (max-width: 1024px) { .posts-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px) { .featured-grid, .posts-grid { grid-template-columns: 1fr !important; } }
      `}</style>
          <Footer />
    </PageLayout>
  );
};

const FeaturedPostCard: React.FC<{ post: typeof blogPosts[0] }> = ({ post }) => {
  const [hov, setHov] = useState(false);
  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <motion.div whileHover={{ y: -3 }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ background: 'var(--bg-elevated)', border: `1px solid ${hov ? 'var(--color-blue-200)' : 'var(--border-color)'}`, borderRadius: 'var(--radius-2xl)', padding: 'var(--space-8)', height: '100%', boxShadow: hov ? 'var(--shadow-lg)' : 'var(--shadow-sm)', transition: 'all var(--transition-base)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
          <Badge variant="primary" size="sm">{post.category}</Badge>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <IconClock size={11} color="var(--text-muted)" /> {post.readTime}
          </span>
        </div>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: 'var(--tracking-snug)', lineHeight: 'var(--leading-snug)', marginBottom: 'var(--space-4)', flex: 1 }}>{post.title}</h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>{post.excerpt}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{post.date}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)', fontWeight: 700, color: hov ? 'var(--accent-primary)' : 'var(--text-muted)', transition: 'color var(--transition-fast)' }}>
            Read <IconArrowRight size={12} color="currentColor" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

const PostCard: React.FC<{ post: typeof blogPosts[0] }> = ({ post }) => {
  const [hov, setHov] = useState(false);
  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <motion.div whileHover={{ y: -2 }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ background: 'var(--bg-elevated)', border: `1px solid ${hov ? 'var(--color-blue-200)' : 'var(--border-color)'}`, borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', height: '100%', boxShadow: hov ? 'var(--shadow-md)' : 'var(--shadow-xs)', transition: 'all var(--transition-base)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'var(--color-blue-50)', color: 'var(--color-blue-500)', border: '1px solid var(--color-blue-200)', borderRadius: 'var(--radius-full)', padding: '2px 8px' }}>{post.category}</span>
        </div>
        <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: 'var(--tracking-snug)', lineHeight: 'var(--leading-snug)', marginBottom: 'var(--space-3)', flex: 1 }}>{post.title}</h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-4)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-soft)', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            <IconClock size={11} color="var(--text-muted)" /> {post.readTime}
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{post.date}</span>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogPage;
