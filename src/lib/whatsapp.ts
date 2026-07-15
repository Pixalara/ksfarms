import type { OrderDraft, Product } from '../types/product'

export const WHATSAPP_NUMBER = import.meta.env.VITE_KSFARMS_WHATSAPP_NUMBER || '919390180366'
export const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(price)

export function openWhatsApp(message: string) {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
}

export function buildOrderMessage(product: Product, draft: OrderDraft) {
  const selected = product.variants.find((variant) => variant.label === draft.variant) ?? product.variants[0]
  const total = selected.price * draft.quantity
  return `Hello KS Farms! 🌿\n\nI would like to place an enquiry/order.\n\nProduct: ${product.name}\nVariant: ${selected.label}\nQuantity: ${draft.quantity}\nUnit Price: ${formatPrice(selected.price)}\nTotal Price: ${formatPrice(total)}\n\nCustomer Name: ${draft.name}\nMobile Number: ${draft.mobile}\nDelivery Location: ${draft.location || 'Not specified'}\nGoogle Maps Location: ${draft.locationUrl || 'Not shared'}\nNotes: ${draft.notes || 'None'}\n\nPlease contact me to confirm availability and delivery. Thank you!`
}

export const generalWhatsAppMessage = 'Hello KS Farms! 🌿 I would like to know more about your products and delivery options.'
