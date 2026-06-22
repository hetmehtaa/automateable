import React, { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const PageLayout: React.FC<Props> = ({ children, title }) => {
  useEffect(() => {
    document.title = title ? `${title} | automateable` : 'automateable';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [title]);
  return <>{children}</>;
};

export default PageLayout;
