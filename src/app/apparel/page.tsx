'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

const DUMMY_APPAREL = [
  { id: 'a1', product_id: 'prod_a1', title: 'Carbon Mesh Coat', price: 8999, size: 'One Size', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800&auto=format&fit=crop' },
  { id: 'a2', product_id: 'prod_a2', title: 'Monolithic Trousers', price: 4499, size: 'M', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop' },
  { id: 'a3', product_id: 'prod_a3', title: 'Ribbed Tactile Knit', price: 2999, size: 'S', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop' },
  { id: 'a4', product_id: 'prod_a4', title: 'Asymmetric Pearl Dress', price: 5499, size: 'S', image: 'https://images.unsplash.com/photo-1515347619252-8bf97779d74f?q=80&w=800&auto=format&fit=crop' },
  { id: 'a5', product_id: 'prod_a5', title: 'Obsidian Silk Blouse', price: 3499, size: 'S', image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=800&auto=format&fit=crop' },
  { id: 'a6', product_id: 'prod_a6', title: 'Structured Tech Blazer', price: 7999, size: 'L', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=800&auto=format&fit=crop' },
];

export default function ApparelPage() {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...product, quantity: 1 });
    openCart();
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black pt-32 pb-24 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-[150px] pointer-events-none mix-blend-multiply" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-24 border-b border-black/10 pb-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4 text-black">
              Apparel
            </h1>
            <p className="text-black/60 font-mono text-xs uppercase tracking-[0.3em]">
              Architectural Uniforms. 6 Items.
            </p>
          </motion.div>
          <div className="hidden md:flex gap-4">
            <button className="text-xs font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors">Sort</button>
            <button className="text-xs font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors">Filter</button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {DUMMY_APPAREL.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="group relative"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: (index % 3) * 0.1 }}
            >
              <div className="absolute -inset-4 bg-white/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[3rem]" />
              <Link href={`/products/${item.product_id}`} className="block relative z-10">
                <div className="aspect-[3/4] w-full overflow-hidden bg-white/80 relative rounded-2xl glass-panel p-2 shadow-sm relative group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-[2s] ease-out rounded-xl"
                  />
                  
                  {/* Subtle shadow gradient overlay to ensure text readability if needed */}
                  <div className="absolute inset-x-2 bottom-2 h-1/3 bg-gradient-to-t from-black/20 to-transparent rounded-xl pointer-events-none" />
                  
                  {/* Glassmorphism Title Plate */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel bg-white/80 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20 flex flex-col items-center">
                    <h3 className="text-xs font-sans tracking-[0.1em] text-black mb-1 uppercase font-medium">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-black/60 font-mono tracking-widest">{item.size} — ₹{item.price}</p>
                  </div>

                  <button 
                    onClick={(e) => handleAddToCart(e, item)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full glass-panel bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white hover:scale-110 text-black z-30 shadow-md"
                  >
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
