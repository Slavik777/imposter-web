/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// ===== GA4 (safe, non-blocking) =====
const GA_ID = 'G-XWD4KFJ166' // <- твій Measurement ID з потоку

function initGA(id: string) {
  try {
    if (!id) return

    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    s.onload = () => console.log('[GA] gtag.js loaded')
    s.onerror = (e) => console.warn('[GA] failed to load gtag.js', e)
    document.head.appendChild(s)

    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).gtag = (...args: any[]) => {
      ;(window as any).dataLayer.push(args)
      // console.log('[GA] gtag call:', ...args) // розкоментуй для діагностики
    }

    ;(window as any).gtag('js', new Date())
    ;(window as any).gtag('config', id)
  } catch (e) {
    console.warn('[GA] init error (ignored):', e)
  }
}
initGA(GA_ID)
// ===== /GA4 =====

// ===== React mount (robust) =====
function mount() {
  try {
    const rootEl = document.getElementById('root')
    if (!rootEl) {
      console.error('[APP] #root not found')
      return
    }
    console.log('[APP] mounting React…')
    ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  } catch (e) {
    console.error('[APP] render error:', e)
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', mount)
} else {
  // у module-скриптів це спрацьовує одразу
  mount()
}
// ===== /React mount =====
