# KS Farms

A premium, responsive farm-to-home catalogue and WhatsApp ordering experience built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Configuration

- **WhatsApp number:** Copy `.env.example` to `.env` and set `VITE_KSFARMS_WHATSAPP_NUMBER`. If no environment value is available, the site uses `919390180366`.
- **Prices and variants:** Edit `src/data/products.ts`. Each product has an editable `variants` list containing a label and price.
- **Product information:** Names, descriptions, badges, ingredients, and image references are also centralized in `src/data/products.ts`.
- **Images:** Local source images are stored in `public/`. Reference them in catalogue data with paths such as `/milk.jpeg`.
- **Editable site content:** Testimonials, FAQs, and contact placeholders are in `src/data/content.ts`.

## WhatsApp ordering flow

Every catalogue card opens an accessible order dialog (a bottom sheet on mobile). The customer chooses a variant and quantity, enters their name and mobile number, and can include delivery location and notes. The dialog calculates unit and total prices, then opens WhatsApp with a pre-filled request to KS Farms. The customer sends that message from their own WhatsApp account; KS Farms can then confirm availability and delivery.

Prices and availability may vary and are confirmed on WhatsApp.
