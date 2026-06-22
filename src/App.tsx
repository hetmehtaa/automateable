import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
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
  <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)' }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ animation:'spin 0.8s linear infinite' }}>
      <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.08)" strokeWidth="2"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </div>
);

const NotFound = () => (
  <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'16px', background:'var(--bg)', textAlign:'center', padding:'32px' }}>
    <div style={{ fontSize:'72px', fontWeight:900, color:'rgba(255,255,255,0.06)', letterSpacing:'-0.06em', lineHeight:1 }}>404</div>
    <div style={{ fontSize:'20px', fontWeight:700, color:'var(--t-hi)', marginTop:'-16px' }}>Page not found</div>
    <div style={{ fontSize:'14px', color:'var(--t-lo)', marginBottom:'8px' }}>This page does not exist. But your automation problem does.</div>
    <a href="/" style={{ display:'inline-flex', alignItems:'center', gap:'8px', height:'40px', padding:'0 20px', background:'var(--t-hi)', color:'#0a0a0b', borderRadius:'8px', fontSize:'14px', fontWeight:700, textDecoration:'none' }}>Back to home</a>
  </div>
);

const AnimatedRoutes = () => {
  const loc = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loader/>}>
        <Routes location={loc} key={loc.pathname}>
          <Route path="/"            element={<HomePage/>}/>
          <Route path="/services"    element={<ServicesPage/>}/>
          <Route path="/tools"       element={<ToolsPage/>}/>
          <Route path="/audit"       element={<AuditPage/>}/>
          <Route path="/use-cases"   element={<UseCasesPage/>}/>
          <Route path="/pricing"     element={<PricingPage/>}/>
          <Route path="/about"       element={<AboutPage/>}/>
          <Route path="/contact"     element={<ContactPage/>}/>
          <Route path="/blog"        element={<BlogPage/>}/>
          <Route path="/blog/:slug"  element={<BlogPostPage/>}/>
          <Route path="/resources"   element={<ResourcesPage/>}/>
          <Route path="*"            element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes/>
    </BrowserRouter>
  );
}

export default App;
