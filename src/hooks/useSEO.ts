export interface SEOMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schema?: object;
}

export function useSEO(meta: SEOMeta) {
  const base = 'https://automateable.com';
  const canonical = meta.canonical ?? '/';
  const ogImage = meta.ogImage ?? `${base}/og-image.jpg`;

  document.title = `${meta.title} | automateable`;

  const setMeta = (name: string, content: string, prop = false) => {
    const attr = prop ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  const setLink = (rel: string, href: string) => {
    let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  };

  setMeta('description', meta.description);
  setMeta('og:title', meta.title, true);
  setMeta('og:description', meta.description, true);
  setMeta('og:url', `${base}${canonical}`, true);
  setMeta('og:image', ogImage, true);
  setMeta('twitter:title', meta.title, true);
  setMeta('twitter:description', meta.description, true);
  setMeta('twitter:image', ogImage, true);
  setLink('canonical', `${base}${canonical}`);

  if (meta.schema) {
    let el = document.querySelector('script[data-page-schema]') as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.setAttribute('data-page-schema', '1');
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(meta.schema);
  }
}
