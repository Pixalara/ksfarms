import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import { WhatsAppIcon as MessageCircle } from './WhatsAppIcon'
import { useState, type CSSProperties } from 'react'
import type { Product, ProductOrderSelection } from '../types/product'
import { formatPrice } from '../lib/whatsapp'

type ProductCardProps = { product: Product; index: number; onOrder: (selection: ProductOrderSelection) => void }
type ProductMediaStyle = CSSProperties & { '--product-image': string; '--product-bg': string; '--product-scale': number; '--product-position': string }

export function ProductCard({ product, index, onOrder }: ProductCardProps) {
  const reduceMotion = useReducedMotion()
  const [variantLabel, setVariantLabel] = useState(product.variants[0].label)
  const [quantity, setQuantity] = useState(1)
  const selectedVariant = product.variants.find((variant) => variant.label === variantLabel) ?? product.variants[0]
  const total = selectedVariant.price * quantity
  const selection = (): ProductOrderSelection => ({ product, variant: selectedVariant.label, quantity })
  const mediaStyle: ProductMediaStyle = {
    '--product-image': `url("${product.image}")`, '--product-bg': product.imagePresentation.background,
    '--product-scale': product.imagePresentation.scale, '--product-position': product.imagePresentation.position,
  }
  return <motion.article className="product-card" layout initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .38, delay: reduceMotion ? 0 : (index % 3) * .04 }}>
    <div className="product-image-wrap" style={mediaStyle}><div className="product-image-stage"><img src={product.image} alt={product.alt} loading="lazy" decoding="async" /></div></div>
    <div className="product-content">
      <div className="product-kicker"><span>{product.category}</span><i aria-hidden="true" />{product.badge}</div>
      <div className="product-title-line"><h3>{product.name}</h3><button className="text-button" onClick={() => onOrder(selection())} aria-label={`View ${product.name} details`}>Details <ArrowUpRight size={16} /></button></div>
      <p>{product.description}</p>
      <div className="product-variants" aria-label={`Select ${product.name} size`}>{product.variants.map((variant) => <button key={variant.label} className={variant.label === selectedVariant.label ? 'selected' : ''} onClick={() => setVariantLabel(variant.label)} aria-pressed={variant.label === selectedVariant.label}>{variant.label}<small>{formatPrice(variant.price)}</small></button>)}</div>
      <div className="card-order-controls">
        <div className="card-unit-price"><small>Unit price</small><strong>{formatPrice(selectedVariant.price)}</strong></div>
        <div className="card-quantity"><small>Quantity</small><div><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label={`Decrease ${product.name} quantity`} disabled={quantity === 1}><Minus size={14} /></button><output aria-live="polite">{quantity}</output><button onClick={() => setQuantity(quantity + 1)} aria-label={`Increase ${product.name} quantity`}><Plus size={14} /></button></div></div>
        <div className="card-total"><small>Total</small><strong aria-live="polite">{formatPrice(total)}</strong></div>
      </div>
      <button className="button button-product" onClick={() => onOrder(selection())}><MessageCircle size={17} /> Order {formatPrice(total)} on WhatsApp</button>
    </div>
  </motion.article>
}
