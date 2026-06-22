import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../sections/Navbar';
import { Footer } from '../sections/Footer';

interface Props { children: React.ReactNode; title?: string; description?: string; }

export const PageLayout: React.FC<Props> = ({ children, title }) => {
  useEffect(() => {
    document.title = title ? `${title} â automateable` : 'automateable';
    window.scrollTo({ top: 0 });
  }, [title]);
  return (
    <>
      <Navbar />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
        style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
        {children}
      </motion.div>
      <Footer />
    </>
  );
};
export default PageLayout;
