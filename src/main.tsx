// --- GA4 init with debug logs ---
const GA_ID = 'G-NLN3R5Y31K';

function initGA(id: string) {
  if (!id) return;

  const url = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  const s = document.createElement('script');
  s.async = true;
  s.src = url;

  s.onload = () => {
    console.log('[GA] gtag.js loaded');
  };
  s.onerror = (e) => {
    console.error('[GA] failed to load gtag.js', e);
  };

  document.head.appendChild(s);

  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).gtag = (...args: any[]) => {
    (window as any).dataLayer.push(args);
    // DEBUG: видно кожен виклик
    try { console.log('[GA] gtag call:', ...args); } catch {}
  };

  (window as any).gtag('js', new Date());
  (window as any).gtag('config', id); // automatic page_view
}

initGA(GA_ID);
// --- /GA4 init ---
