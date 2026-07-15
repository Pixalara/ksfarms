export type ProductCategory = 'Dairy' | 'Ghee' | 'Honey' | 'Oils'

export interface ProductVariant {
  label: string
  price: number
}

export interface ProductImagePresentation {
  /** Position and scale the original local image without cropping the product. */
  position: string
  scale: number
  background: string
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  image: string
  imagePresentation: ProductImagePresentation
  alt: string
  badge: string
  description: string
  detail: string
  ingredients: string
  variants: ProductVariant[]
}

export interface ProductOrderSelection {
  product: Product
  variant: string
  quantity: number
}

export type OrderDraft = {
  name: string
  mobile: string
  variant: string
  quantity: number
  location: string
  locationUrl: string
  notes: string
}
