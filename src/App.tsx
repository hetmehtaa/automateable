import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { AppShell } from './components/AppShell';
import './styles/global.css';

const HomePage      = lazy(() => import('./pages/HomePage'));
const ServicesPage  = lazy(() => import('./pages/ServicesPage'));
const ToolsPage     = lazy(() => import('./pages/ToolsPage'));
const AuditPage     = lazy(() => import('./pages/AuditPage'));
const UseCasesPage  = lazy(() => import('./pages/UseCasesPage'));
const PricingPage   = lazy(() => import('./pages/PricingPage'));
const AboutPage     = lazy(() => import('./pages/AboutPage'));
const ContactPage   = lazy(() => import('./pages/ContactPage'));
const BlogPage      = lazy(() => import('./pages/BlogPage'));
const BlogPostPage  = lazy(() => import('./pages/BlogPostPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));

const Loader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
      <circle cx="10" cy="10" r="8" stroke="var(--border-2)" strokeWidth="2"/>
      <path d="M10 2a8 8 0 0 1 8 8" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </div>
);

const NotFound = () => (
  <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center', padding: 32 }}>
    <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--f11)', color: 'var(--ink-4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Error 404</div>
    <h1 style={{ fontSize: 'clamp(var(--f32), 5vw, var(--f56))', fontWeight: 900, letterSpacing: '-0.05em', color: 'var(--ink-0)' }}>Page not found</h1>
    <p style={{ color: 'var(--ink-3)', fontSize: 'var(--f15)', marginBottom: 8 }}>This page does not exist. But your automation problem does.</p>
    <a href="/" className="btn btn--lg btn--primary">Back to home</a>
  </div>
);

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const loc = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loader />}>
        <Routes location={loc} key={loc.pathname}>
          <Route path="/"            element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/services"    element={<PageWrapper><ServicesPage /></PageWrapper>} />
          <Route path="/tools"       element={<PageWrapper><ToolsPage /></PageWrapper>} />
          <Route path="/audit"       element={<PageWrapper><AuditPage /></PageWrapper>} />
          <Route path="/use-cases"   element={<PageWrapper><UseCasesPage /></PageWrapper>} />
          <Route path="/pricing"     element={<PageWrapper><PricingPage /></PageWrapper>} />
          <Route path="/about"       element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="/contact"     element={<PageWrapper><ContactPage /></PageWrapper>} />
          <Route path="/blog"        element={<PageWrapper><BlogPage /></PageWrapper>} />
          <Route path="/blog/:slug"  element={<PageWrapper><BlogPostPage /></PageWrapper>} />
          <Route path="/resources"   element={<PageWrapper><ResourcesPage /></PageWrapper>} />
          <Route path="*"            element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <AnimatedRoutes />
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
