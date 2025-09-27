import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// --- GA4 init (programmatic, no inline scripts) ---
const GA_ID = 'G-XWD4KFJ166' // твій Measurement ID

function initGA(id: string) {
  if (!id) return

  // підключаємо gtag.js
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(s)

  // створюємо window.dataLayer та window.gtag з коректною сигнатурою
  ;(window as any).dataLayer = (window as any).dataLayer || []
  ;(window as any).gtag = (...args: any[]) => {
    (window as any).dataLayer.push(args)
  }

  ;(window as any).gtag('js', new Date())
  ;(window as any).gtag('config', id) // automatic page_view
}

initGA(GA_ID)
// --- /GA4 init ---

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
