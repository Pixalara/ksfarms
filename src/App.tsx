import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Check, ChevronDown, CookingPot, Droplets, HeartHandshake, Leaf, MapPinned, PackageCheck, ShieldCheck, ShoppingBag, Sprout, Truck, Wheat } from 'lucide-react'
import { WhatsAppIcon as MessageCircle } from './components/WhatsAppIcon'
import { useState } from 'react'
import { Header } from './components/Header'
import { HeroVideo } from './components/HeroVideo'
import { OrderModal } from './components/OrderModal'
import { ProductCard } from './components/ProductCard'
import { Reveal } from './components/Reveal'
import { contact, faqs, testimonials } from './data/content'
import { categories, products, type FilterCategory } from './data/products'
import { generalWhatsAppMessage, openWhatsApp } from './lib/whatsapp'
import type { ProductOrderSelection } from './types/product'

const milkBenefits = [
  'Pure A1 cow milk',
  'Naturally rich in calcium',
  'Quality milk protein',
  'Fresh farm taste',
  'Carefully handled',
  'Delivered to your doorstep',
]

const trustItems = [{ icon: Sprout, text: 'Fresh from Farm' }, { icon: Leaf, text: 'Naturally Made' }, { icon: ShieldCheck, text: 'Quality You Can Trust' }, { icon: Truck, text: 'Delivered with Care' }]
const whyItems = [
  { icon: Wheat, kicker: 'HONESTLY SIMPLE', title: 'Pure ingredients', copy: 'Everyday essentials made with recognisable ingredients and an uncomplicated approach to nourishment.', points: ['Straightforward recipes', 'Made for everyday kitchens'], className: 'bento-wide' },
  { icon: CookingPot, kicker: 'ROOTED IN TRADITION', title: 'Traditional goodness', copy: 'Familiar flavours and time-honoured kitchen wisdom, thoughtfully prepared for the meals you already love.', points: ['Familiar Indian flavours', 'Made with patient care'], className: '' },
  { icon: Droplets, kicker: 'CAREFULLY HANDLED', title: 'Freshness you can trust', copy: 'Fresh products deserve attention at every step—from preparation and packing to final handover.', points: ['Freshness first', 'Availability confirmed'], className: '' },
  { icon: Truck, kicker: 'FARM TO FRONT DOOR', title: 'Farm-to-door convenience', copy: 'A simpler way to bring farm goodness home without a complicated checkout or unfamiliar process.', points: ['Direct local delivery', 'Google Maps location sharing'], className: 'bento-wide' },
  { icon: MessageCircle, kicker: 'ORDER IN A FEW TAPS', title: 'Easy WhatsApp ordering', copy: 'Choose a size, set the quantity, see your total, and send the complete order from your own WhatsApp.', points: ['Live order totals', 'Direct confirmation'], className: '' },
  { icon: MapPinned, kicker: 'NEIGHBOURHOOD CARE', title: 'Local delivery, personal care', copy: 'Share your exact location and speak directly with KS Farms to confirm availability and delivery details.', points: ['Personal assistance', 'Care at every handover'], className: 'bento-wide' },
]

function App() {
  const [filter, setFilter] = useState<FilterCategory>('All')
  const [selectedOrder, setSelectedOrder] = useState<ProductOrderSelection | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const reduceMotion = useReducedMotion()
  const visibleProducts = filter === 'All' ? products : products.filter((product) => product.category === filter)
  return <div className="page-shell">
    <Header />
    <main>
      <section id="home" className="hero">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" /><div className="leaf-doodle leaf-one" />
        <div className="shell hero-grid">
          <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .72, ease: [0.22, 1, .36, 1] }}>
            <p className="eyebrow"><Leaf size={15} /> THE A1 MILK DIFFERENCE</p>
            <div className="a1-hero-label"><span>A1</span><p><small>OUR SIGNATURE MILK</small>Pure, fresh and naturally nourishing</p></div>
            <h1>Pure A1 milk,<br /><em>nurtured naturally.</em></h1>
            <p className="hero-description">Organic farm milk with naturally occurring calcium and quality protein—carefully handled for a clean, fresh taste and delivered with care.</p>
            <div className="hero-actions"><a className="button button-dark" href="#products"><ShoppingBag size={18} /> Explore A1 milk</a><button className="button button-light" onClick={() => openWhatsApp(generalWhatsAppMessage)}><MessageCircle size={18} /> Order on WhatsApp</button></div>
            <div className="milk-benefits-rail" aria-label="Benefits of KS Farms A1 milk">
              <div className="milk-benefits-track">{[...milkBenefits, ...milkBenefits].map((benefit, index) => <span key={`${benefit}-${index}`} aria-hidden={index >= milkBenefits.length}><i /><b>{benefit}</b></span>)}</div>
            </div>
            <div className="trust-chips"><span><Sprout size={15} /> Farm Fresh</span><span><Leaf size={15} /> Naturally Produced</span><span><HeartHandshake size={15} /> Delivered with Care</span></div>
          </motion.div>
          <motion.div className="hero-visual hero-video-visual" initial={reduceMotion ? false : { opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .75, delay: .08, ease: [0.22, 1, .36, 1] }}>
            <HeroVideo />
          </motion.div>
        </div>
        <a href="#products" className="scroll-cue"><span>Scroll to discover</span><ArrowDown size={17} /></a>
      </section>
      <section className="benefits-strip"><div className="shell benefits-grid">{trustItems.map(({ icon: Icon, text }) => <div key={text}><Icon size={21} /><span>{text}</span></div>)}</div></section>
      <section id="products" className="products section"><div className="shell">
        <Reveal className="section-intro centered"><p className="eyebrow">THE KS FARMS PANTRY</p><h2>Goodness worth <em>coming home to.</em></h2><p>Everyday essentials, thoughtfully chosen for your kitchen and your table.</p></Reveal>
        <div className="filter-row" role="tablist" aria-label="Product categories">{categories.map((category) => <button key={category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} role="tab" aria-selected={filter === category}>{category}</button>)}</div>
        <motion.div className="products-grid" layout>{visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} onOrder={setSelectedOrder} />)}</motion.div>
      </div></section>
      <section id="story" className="story section"><div className="shell story-grid">
        <Reveal className="story-collage"><div className="collage-main"><img src="milkdoordelivery.jpeg" alt="Fresh milk delivered to a home" loading="lazy" decoding="async" /></div><div className="collage-side"><img src="paneer2.jpeg" alt="Fresh paneer from KS Farms" loading="lazy" decoding="async" /></div><div className="collage-stamp"><Leaf size={21} /><span>Thoughtfully<br />handled</span></div></Reveal>
        <Reveal className="story-copy" delay={.1}><p className="eyebrow">OUR STORY</p><h2>From our farm,<br /><em>with care.</em></h2><p>KS Farms is built around the quiet joy of good food—naturally made products, handled with attention, and delivered with the kind of care you would expect for your own table.</p><p>We believe choosing everyday essentials should feel simple, reassuring, and full of goodness.</p><div className="promise-cards"><div><Leaf /><span><b>Naturally crafted</b><small>Simple, familiar goodness</small></span></div><div><PackageCheck /><span><b>Carefully handled</b><small>Thoughtful from start to finish</small></span></div><div><Truck /><span><b>Delivered fresh</b><small>To your doorstep with care</small></span></div></div></Reveal>
      </div></section>
      <section id="why-us" className="why-us section"><div className="shell"><Reveal className="section-intro"><p className="eyebrow">WHY KS FARMS</p><h2>The little things make<br /><em>goodness feel different.</em></h2></Reveal><div className="bento-grid">{whyItems.map(({ icon: Icon, kicker, title, copy, points, className }, index) => <Reveal key={title} className={`bento-card ${className}`}><div className="bento-card-top"><span className="bento-icon"><Icon /></span><small>{kicker}</small><b>{String(index + 1).padStart(2, '0')}</b></div><div className="bento-copy"><h3>{title}</h3><p>{copy}</p></div><ul className="bento-points">{points.map((point) => <li key={point}><Check size={13} />{point}</li>)}</ul><span className="bento-mark">KS</span></Reveal>)}</div></div></section>
      <section className="delivery-cta"><div className="shell delivery-grid"><Reveal className="delivery-image"><img src="milkdoordelivery.jpeg" alt="Milk delivery at a doorstep" /></Reveal><Reveal className="delivery-copy" delay={.1}><p className="eyebrow">DELIVERY WITH A DIFFERENCE</p><h2>Fresh from our farm<br />to your <em>doorstep.</em></h2><p>Share your location, select your favourites, and let us help make everyday shopping feel more considered.</p><button className="button button-gold" onClick={() => openWhatsApp(generalWhatsAppMessage)}><MessageCircle size={18} /> Order on WhatsApp</button></Reveal></div></section>
      <section className="testimonials section"><div className="shell"><Reveal className="section-intro centered"><p className="eyebrow">KIND WORDS</p><h2>Made for everyday<br /><em>good moments.</em></h2><p className="placeholder-note">Customer feedback placeholders — replace with verified feedback as it becomes available.</p></Reveal><div className="testimonial-grid">{testimonials.map((item) => <Reveal className="testimonial-card" key={item.quote}><div className="quote-mark">“</div><blockquote>{item.quote}</blockquote><footer><span>{item.name}</span><small>{item.place}</small></footer></Reveal>)}</div></div></section>
      <section id="faq" className="faq section"><div className="shell faq-grid"><Reveal><p className="eyebrow">NEED TO KNOW</p><h2>Questions, made<br /><em>simple.</em></h2><p>Our WhatsApp ordering flow is here to keep choosing good food easy and personal.</p><button className="button button-light" onClick={() => openWhatsApp(generalWhatsAppMessage)}><MessageCircle size={18} /> Ask us on WhatsApp</button></Reveal><div className="accordion">{faqs.map((item, index) => <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={item.question}><button aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{item.question}</span><ChevronDown size={19} /></button><AnimatePresence initial={false}>{openFaq === index && <motion.div id={`faq-answer-${index}`} initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:.25 }}><p>{item.answer}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>
      <section id="contact" className="final-cta"><div className="shell"><Reveal className="final-cta-inner"><p className="eyebrow">BRING HOME THE GOODNESS</p><h2>Good food begins with<br /><em>good care.</em></h2><p>Send us a message and we will help you choose what feels right for your home.</p><button className="button button-gold" onClick={() => openWhatsApp(generalWhatsAppMessage)}><MessageCircle size={19} /> Start an order on WhatsApp</button><div className="final-leaf"><Leaf /></div></Reveal></div></section>
    </main>
    <footer className="footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="shell footer-main">
        <div className="footer-brand">
          <a className="footer-logo-plate" href="#home" aria-label="KS Farms home"><img src="ksfarms-logo-transparent.png" alt="KS Farms" /></a>
          <p className="footer-tagline">Pure A1 milk and naturally made farm essentials, thoughtfully delivered to your everyday table.</p>
          <div className="footer-principles"><span>Farm fresh</span><i /><span>Naturally made</span><i /><span>Delivered with care</span></div>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <div><b>Explore</b><a href="#products">Our products</a><a href="#story">Our story</a><a href="#why-us">Why KS Farms</a><a href="#faq">FAQs</a></div>
          <div><b>Connect</b><a href={`mailto:${contact.email}`}>{contact.email}</a><a href="#contact">{contact.instagram}</a><button onClick={() => openWhatsApp(generalWhatsAppMessage)}>WhatsApp KS Farms</button></div>
          <div><b>Visit & delivery</b><span>{contact.address}</span><span>{contact.areas}</span><a href="#contact">Contact information</a></div>
        </nav>
      </div>
      <div className="shell footer-order-strip"><div><span>READY TO ORDER?</span><strong>Bring farm goodness home.</strong></div><button onClick={() => openWhatsApp(generalWhatsAppMessage)}><MessageCircle size={20} /> Order on WhatsApp <ArrowDown className="footer-order-arrow" size={17} /></button></div>
      <div className="shell footer-bottom"><span>© 2026 KS Farms. Made with care.</span><span>Prices and availability may vary. Please confirm on WhatsApp.</span></div>
    </footer>
    <button className="floating-wa" onClick={() => openWhatsApp(generalWhatsAppMessage)} aria-label="Order from KS Farms on WhatsApp"><span className="floating-wa-icon"><MessageCircle size={27} /></span><span className="floating-wa-label">Order on WhatsApp</span></button>
    <div className="mobile-action-bar"><a href="#products"><ShoppingBag size={18} /> Browse Products</a><button onClick={() => openWhatsApp(generalWhatsAppMessage)}><MessageCircle size={18} /> WhatsApp Us</button></div>
    <OrderModal selection={selectedOrder} onClose={() => setSelectedOrder(null)} />
  </div>
}

export default App
