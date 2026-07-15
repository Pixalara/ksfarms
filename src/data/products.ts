import type { Product } from '../types/product'

/** Product catalogue — edit prices and variants here. */
export const products: Product[] = [
  {
    id: 'fresh-farm-milk', name: 'Fresh A1 Farm Milk', category: 'Dairy', image: 'milk.jpeg',
    imagePresentation: { position: 'center 48%', scale: 0.86, background: '#edf2e9' },
    alt: 'Fresh farm milk in a glass bottle', badge: 'Daily fresh',
    description: 'Pure A1 farm milk for your everyday nourishment.',
    detail: 'Naturally rich in calcium and quality milk protein, carefully handled from farm to home for a clean, fresh taste.',
    ingredients: 'Pure A1 cow milk', variants: [{ label: '500 ml', price: 35 }, { label: '1 Litre', price: 65 }],
  },
  {
    id: 'desi-cow-ghee', name: 'Desi Cow Ghee', category: 'Ghee', image: 'desicowghee.jpeg',
    imagePresentation: { position: 'center', scale: 0.9, background: '#f4ead3' },
    alt: 'Jar of KS Farms desi cow ghee', badge: 'Traditional craft',
    description: 'A rich kitchen essential with an inviting aroma.',
    detail: 'Thoughtfully prepared for the recipes and rituals that deserve a little extra care.',
    ingredients: 'Cow milk ghee', variants: [{ label: '500 ml', price: 650 }, { label: '1 Litre', price: 1250 }],
  },
  {
    id: 'desi-buffalo-ghee', name: 'Desi Buffalo Ghee', category: 'Ghee', image: 'desibuffelloghee.jpeg',
    imagePresentation: { position: 'center', scale: 0.8, background: '#e9e8dd' },
    alt: 'Jar of KS Farms desi buffalo ghee', badge: 'Full-bodied',
    description: 'Deeply golden, generous and made for slow cooking.',
    detail: 'A hearty ghee with a characterful flavour for everyday cooking and special meals.',
    ingredients: 'Buffalo milk ghee', variants: [{ label: '500 ml', price: 700 }, { label: '1 Litre', price: 1350 }],
  },
  {
    id: 'fresh-paneer', name: 'Fresh Paneer', category: 'Dairy', image: 'paneer.jpeg',
    imagePresentation: { position: 'center', scale: 0.91, background: '#edf0e5' },
    alt: 'Fresh paneer cubes prepared for serving', badge: 'Kitchen fresh',
    description: 'Soft, satisfying paneer for everyday favourites.',
    detail: 'Prepared with a focus on freshness and careful handling for a beautiful home-cooked meal.',
    ingredients: 'Milk, food-grade coagulant', variants: [{ label: '250 g', price: 110 }, { label: '500 g', price: 210 }, { label: '1 kg', price: 400 }],
  },
  {
    id: 'raw-natural-honey', name: 'Raw Natural Honey', category: 'Honey', image: 'rawhoney.jpeg',
    imagePresentation: { position: 'center', scale: 0.9, background: '#f5ead4' },
    alt: 'Jar of raw natural honey with a honey dipper', badge: 'Naturally sweet',
    description: 'Golden sweetness, kept close to nature.',
    detail: 'A versatile pantry companion to enjoy in warm drinks, breakfasts, and thoughtful recipes.',
    ingredients: 'Natural honey', variants: [{ label: '250 g', price: 180 }, { label: '500 g', price: 340 }, { label: '1 kg', price: 650 }],
  },
  {
    id: 'groundnut-oil', name: 'Cold-Pressed Groundnut Oil', category: 'Oils', image: 'groundnutoil.jpeg',
    imagePresentation: { position: 'center', scale: 0.88, background: '#efe8d8' },
    alt: 'Bottle of cold-pressed groundnut oil', badge: 'Cold-pressed',
    description: 'A warm, nutty pantry staple for everyday cooking.',
    detail: 'Pressed with a simple approach to retain the honest character of groundnuts.',
    ingredients: 'Groundnuts', variants: [{ label: '500 ml', price: 190 }, { label: '1 Litre', price: 360 }],
  },
  {
    id: 'coconut-oil', name: 'Cold-Pressed Coconut Oil', category: 'Oils', image: 'coconutoil.jpeg',
    imagePresentation: { position: 'center', scale: 0.84, background: '#e7eee4' },
    alt: 'Bottle of cold-pressed coconut oil', badge: 'Cold-pressed',
    description: 'A clean, fragrant kitchen and home essential.',
    detail: 'Carefully pressed coconut oil with a gentle tropical character.',
    ingredients: 'Coconuts', variants: [{ label: '500 ml', price: 220 }, { label: '1 Litre', price: 420 }],
  },
]

export const categories = ['All', 'Dairy', 'Ghee', 'Honey', 'Oils'] as const
export type FilterCategory = (typeof categories)[number]
