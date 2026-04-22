'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

const DUMMY_PRODUCTS = [
  { id: '1', product_id: 'prod_a1', title: 'Carbon Mesh Coat', price: 8999, size: 'One Size', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop', colSpan: 'md:col-span-8', aspect: 'aspect-[16/9]' },
  { id: '2', product_id: 'prod_a2', title: 'Monolithic Trousers', price: 4499, size: 'M', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800&auto=format&fit=crop', colSpan: 'md:col-span-4', aspect: 'aspect-[4/5]' },
  { id: '3', product_id: 'prod_a3', title: 'Ribbed Tactile Knit', price: 2999, size: 'S', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop', colSpan: 'md:col-span-5', aspect: 'aspect-[3/4]' },
  { id: '4', product_id: 'prod_a4', title: 'Asymmetric Void Dress', price: 5499, size: 'S', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop', colSpan: 'md:col-span-7', aspect: 'aspect-[21/9]' },
];

export function ProductGrid() {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...product, quantity: 1 });
    openCart();
  };

  return (
    <section className="py-24 bg-[#FAFAFA] relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-start mb-32 border-b border-black/10 pb-8"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-black/60 mb-4 font-mono">Structural Wear</span>
          <h2 className="text-3xl md:text-6xl font-light text-black mb-4 tracking-tighter">
            Architectural <span className="font-serif italic text-black/80">Uniform</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-12">
          {DUMMY_PRODUCTS.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.15 }}
              className={`${item.colSpan} relative group`}
            >
              <div className="absolute -inset-4 bg-white/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[3rem]" />
              <Link href={`/products/${item.product_id}`} className="block w-full relative z-10">
                <div className={`${item.aspect} w-full overflow-hidden bg-white/80 relative rounded-xl md:rounded-2xl glass-panel p-1 md:p-2`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center grayscale-[10%] group-hover:scale-105 transition-transform duration-[2s] ease-out rounded-xl"
                  />
                  
                  {/* Glassmorphism Details Panel */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-20">
                      <h3 className="text-[10px] md:text-xs font-sans tracking-[0.1em] text-black mb-0.5 md:mb-1 uppercase font-medium line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[8px] md:text-[10px] text-black/70 font-mono tracking-widest uppercase">₹{item.price}</p>
                    </div>

                    {/* Add to Cart floating ring */}
                    <button 
                      onClick={(e) => handleAddToCart(e, item)}
                      className="w-8 h-8 md:w-12 md:h-12 rounded-full glass-panel flex items-center justify-center backdrop-blur-md bg-white/60 text-black hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-3.5 md:h-3.5">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-32 w-full flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Link href="/apparel" className="group inline-flex items-center justify-center glass-panel px-12 py-5 uppercase tracking-[0.3em] text-[10px] font-medium text-black hover:text-white transition-all duration-500 rounded-full hover:bg-black">
            View Complete Wardrobe
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
