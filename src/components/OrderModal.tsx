import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, ExternalLink, LoaderCircle, MapPin, Minus, Navigation, Plus, X } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { OrderDraft, ProductOrderSelection } from '../types/product'
import { buildOrderMessage, formatPrice, openWhatsApp } from '../lib/whatsapp'
import { WhatsAppIcon } from './WhatsAppIcon'

type OrderModalProps = { selection: ProductOrderSelection | null; onClose: () => void }
const emptyDraft = ({ product, variant, quantity }: ProductOrderSelection): OrderDraft => ({
  name: '', mobile: '',
  variant: product.variants.some((item) => item.label === variant) ? variant : product.variants[0].label,
  quantity: Math.max(1, quantity), location: '', locationUrl: '', notes: '',
})

export function OrderModal({ selection, onClose }: OrderModalProps) {
  const product = selection?.product ?? null
  const [draft, setDraft] = useState<OrderDraft | null>(() => selection ? emptyDraft(selection) : null)
  const nameInput = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [locationError, setLocationError] = useState('')
  useEffect(() => {
    if (!selection) { setDraft(null); return }
    setDraft(emptyDraft(selection))
    setLocationStatus('idle')
    setLocationError('')
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusTimer = window.setTimeout(() => nameInput.current?.focus(), 80)
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { onClose(); return }
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href]')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)
    return () => { window.clearTimeout(focusTimer); document.body.style.overflow = ''; window.removeEventListener('keydown', handleKeydown); previousFocus?.focus() }
  }, [selection, onClose])
  if (!product || !draft) return null
  const selected = product.variants.find((variant) => variant.label === draft.variant) ?? product.variants[0]
  const total = selected.price * draft.quantity
  const update = <K extends keyof OrderDraft>(key: K, value: OrderDraft[K]) => setDraft((current) => current ? { ...current, [key]: value } : current)
  const captureLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error'); setLocationError('Location sharing is not supported by this browser. Paste a Google Maps link instead.'); return
    }
    setLocationStatus('loading'); setLocationError('')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const latitude = coords.latitude.toFixed(6)
        const longitude = coords.longitude.toFixed(6)
        update('locationUrl', `https://www.google.com/maps?q=${latitude},${longitude}`)
        setLocationStatus('success')
      },
      (error) => {
        const message = error.code === error.PERMISSION_DENIED
          ? 'Location permission was declined. You can paste a Google Maps share link instead.'
          : error.code === error.TIMEOUT ? 'Location request timed out. Please try again.' : 'Your location could not be detected. Paste a Google Maps link instead.'
        setLocationStatus('error'); setLocationError(message)
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    )
  }
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); openWhatsApp(buildOrderMessage(product, draft)); onClose() }
  return <AnimatePresence>{product && <motion.div className="modal-backdrop" role="presentation" onMouseDown={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.section ref={dialogRef} className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title" onMouseDown={(event) => event.stopPropagation()} initial={reduceMotion ? false : { opacity: 0, y: 36, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 28, scale: .98 }} transition={{ duration: .26 }}>
      <div className="sheet-handle" /><button className="close-modal" onClick={onClose} aria-label="Close order form"><X size={20} /></button>
      <div className="order-heading"><p className="eyebrow">ORDER WITH EASE</p><h2 id="order-title">{product.name}</h2><p>{product.detail}</p></div>
      <form onSubmit={submit}>
        <div className="order-product"><img src={product.image} alt="" /><div><span>Selected product</span><strong>{product.name}</strong><small>{product.ingredients}</small></div></div>
        <fieldset><legend>Choose your variant</legend><div className="variant-options">{product.variants.map((variant) => <label key={variant.label} className={draft.variant === variant.label ? 'selected' : ''}><input type="radio" name="variant" value={variant.label} checked={draft.variant === variant.label} onChange={() => update('variant', variant.label)} /><span>{variant.label}</span><b>{formatPrice(variant.price)}</b></label>)}</div></fieldset>
        <div className="quantity-row"><span>Quantity</span><div className="quantity-control"><button type="button" onClick={() => update('quantity', Math.max(1, draft.quantity - 1))} aria-label="Decrease quantity"><Minus size={15} /></button><output aria-live="polite">{draft.quantity}</output><button type="button" onClick={() => update('quantity', draft.quantity + 1)} aria-label="Increase quantity"><Plus size={15} /></button></div></div>
        <div className="form-grid"><label>Customer name <input ref={nameInput} required autoComplete="name" value={draft.name} onChange={(event) => update('name', event.target.value)} placeholder="Your full name" /></label><label>Mobile number <input required inputMode="tel" autoComplete="tel" pattern="[0-9+() -]{7,}" value={draft.mobile} onChange={(event) => update('mobile', event.target.value)} placeholder="Your mobile number" /></label></div>
        <div className="location-section">
          <div className="location-title"><span><MapPin size={15} /> Delivery location</span><small>Optional</small></div>
          <label htmlFor="delivery-address">Address, area or landmark<input id="delivery-address" autoComplete="street-address" value={draft.location} onChange={(event) => update('location', event.target.value)} placeholder="Area, city or nearby landmark" /></label>
          <div className="map-location-actions">
            <button className="use-location-button" type="button" onClick={captureLocation} disabled={locationStatus === 'loading'}>{locationStatus === 'loading' ? <LoaderCircle className="location-spinner" size={16} /> : <Navigation size={16} />}{locationStatus === 'loading' ? 'Finding your location…' : locationStatus === 'success' ? 'Update current location' : 'Use my current location'}</button>
            <span>or</span>
            <label className="map-link-field"><span>Google Maps link</span><input type="url" inputMode="url" value={draft.locationUrl} onChange={(event) => { update('locationUrl', event.target.value); setLocationStatus(event.target.value ? 'success' : 'idle'); setLocationError('') }} placeholder="Paste a Maps share link" /></label>
          </div>
          {locationStatus === 'error' && <p className="location-error" role="alert">{locationError}</p>}
          {draft.locationUrl && <div className="location-confirmed"><CheckCircle2 size={16} /><span>Google Maps location added</span><a href={draft.locationUrl} target="_blank" rel="noopener noreferrer">View map <ExternalLink size={13} /></a><button type="button" onClick={() => { update('locationUrl', ''); setLocationStatus('idle') }}>Remove</button></div>}
          <p className="location-privacy">Your location is only added to the WhatsApp order message sent to KS Farms.</p>
        </div>
        <label>Additional notes <textarea value={draft.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Any delivery or product notes? (optional)" rows={2} /></label>
        <div className="order-total"><span><small>Unit price</small><b>{formatPrice(selected.price)}</b></span><span><small>Quantity</small><b>{draft.quantity}</b></span><strong><small>Total price</small>{formatPrice(total)}</strong></div>
        <button className="button button-dark continue-button" type="submit"><WhatsAppIcon size={18} /> Continue to WhatsApp</button>
      </form>
    </motion.section>
  </motion.div>}</AnimatePresence>
}
