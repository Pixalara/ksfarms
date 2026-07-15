import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { WhatsAppIcon as MessageCircle } from './WhatsAppIcon'
import { useEffect, useState } from 'react'
import { generalWhatsAppMessage, openWhatsApp } from '../lib/whatsapp'

const links = [
  ['Home', '#home'], ['Products', '#products'], ['Our Story', '#story'],
  ['Why KS Farms', '#why-us'], ['FAQ', '#faq'], ['Contact', '#contact'],
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    handleScroll(); window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const close = () => setOpen(false)
  return <>
    <div className="announcement" aria-label="KS Farms announcement"><div className="ticker">Fresh from our farm to your doorstep <span>•</span> Natural <span>•</span> Pure <span>•</span> Trusted</div></div>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="wordmark" href="#home" onClick={close}><img src="/ksfarms-logo-transparent.png" alt="KS Farms" /></a>
        <div className="nav-links">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
        <button className="button button-dark header-cta" onClick={() => openWhatsApp(generalWhatsAppMessage)}><MessageCircle size={17} /> WhatsApp Us</button>
        <button className="menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
    </header>
    <AnimatePresence>{open && <motion.div className="mobile-nav" initial={reduceMotion ? false : { opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: .22 }}>
      {links.map(([label, href]) => <a key={href} href={href} onClick={close}>{label}</a>)}
      <button className="button button-dark" onClick={() => { close(); openWhatsApp(generalWhatsAppMessage) }}><MessageCircle size={18} /> WhatsApp Us</button>
    </motion.div>}</AnimatePresence>
  </>
}
