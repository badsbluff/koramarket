'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

const DUMMY_PRODUCTS = [
  { id: '1', product_id: 'prod_1', title: 'Silk Wrap Obsidian', price: 12000, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop', color: '#D4AF37' },
  { id: '2', product_id: 'prod_2', title: 'Formless Tunic', price: 8500, image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800&auto=format&fit=crop', color: '#9333ea' },
  { id: '3', product_id: 'prod_3', title: 'Carbon Pearl Necklace', price: 6200, image: 'https://images.unsplash.com/photo-1599643478524-fb66fa432dd3?q=80&w=800&auto=format&fit=crop', color: '#3b82f6' },
  { id: '4', product_id: 'prod_4', title: 'Monolithic Blazer', price: 15000, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop', color: '#D4AF37' },
];

export function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...product, quantity: 1, size: 'One Size' });
    openCart();
  };

  return (
    <section className="py-32 bg-[#FAFAFA] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-[50vh] bg-gradient-to-b from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black/10 pb-8">
          <div className="relative">
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-[#D4AF37]/10 blur-[60px] rounded-full mix-blend-multiply pointer-events-none" />
            <h2 className="text-5xl md:text-7xl font-serif italic text-black/90 mb-4 tracking-tight">Curated <span className="font-sans not-italic text-black">Forms</span></h2>
            <p className="text-black/60 font-mono text-xs uppercase tracking-[0.2em] max-w-sm leading-relaxed">
              Lumina pieces crafted with precision. An exploration of reflection and purity.
            </p>
          </div>
          <Link href="/jewelry" className="group relative inline-block text-[11px] uppercase tracking-[0.3em] font-medium text-black/70 hover:text-black transition-colors overflow-hidden pb-2">
            Explore The Light
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black origin-left transform scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"></span>
          </Link>
        </div>
      </div>

      <div className="relative z-20">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto hide-scrollbar gap-8 px-4 sm:px-6 lg:px-8 pb-12 snap-x snap-mandatory"
        >
          {DUMMY_PRODUCTS.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="min-w-[320px] md:min-w-[400px] snap-center group relative"
            >
              <div className="absolute -inset-4 bg-white/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[3rem]" />
              <Link href={`/products/${item.product_id}`} className="block relative z-10 h-full">
                <div className="aspect-[3/4] w-full overflow-hidden bg-white/80 shadow-md relative rounded-2xl glass-panel p-2 mb-6">
                  
                  {/* Dynamic Bloom Hover Background */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 blur-3xl rounded-full scale-150 transform -translate-y-1/2 pointer-events-none"
                    style={{ backgroundColor: item.color }}
                  />

                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-[2s] ease-out rounded-xl"
                  />
                  
                  {/* Soft gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-80" />

                  {/* Add to Cart Floating Mechanism */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-end transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-30">
                     <button 
                       onClick={(e) => handleAddToCart(e, item)}
                       className="glass-panel bg-white/80 text-black px-6 py-4 rounded-xl text-[10px] uppercase font-medium tracking-[0.2em] shadow-xl hover:bg-black hover:text-white transition-colors flex items-center justify-center backdrop-blur-3xl"
                     >
                       Acquire
                     </button>
                  </div>
                </div>

                <div className="flex justify-between items-end px-2">
                  <div>
                    <h3 className="text-sm font-medium text-black font-sans tracking-wide mb-1">{item.title}</h3>
                    <p className="text-[10px] text-black/50 uppercase tracking-widest font-mono">Edition 01</p>
                  </div>
                  <p className="text-sm text-black/80 font-mono tracking-tighter">₹{item.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
