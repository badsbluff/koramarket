'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Footer() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <footer ref={containerRef} className="bg-[#FAFAFA] text-black pt-24 pb-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="col-span-1 md:col-span-5 pr-12">
            <h3 className="text-xl font-light tracking-[0.3em] uppercase mb-8 text-black">The Minimalist</h3>
            <p className="text-black/60 text-sm leading-loose font-light max-w-sm">
              Curated Korean trending fashion and high-end jewelry. Designed for the modern aesthetic, crafted for eternity.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-8 text-black/80">Discover</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-black/60 hover:text-black transition-colors duration-300 text-sm font-light">New Arrivals</a></li>
              <li><a href="#" className="text-black/60 hover:text-black transition-colors duration-300 text-sm font-light">Apparel</a></li>
              <li><a href="#" className="text-black/60 hover:text-[#D4AF37] transition-colors duration-300 text-sm font-light">Jewelry</a></li>
              <li><a href="#" className="text-black/60 hover:text-black transition-colors duration-300 text-sm font-light">Accessories</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-8 text-black/80">Service</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-black/60 hover:text-black transition-colors duration-300 text-sm font-light">Client Care</a></li>
              <li><a href="#" className="text-black/60 hover:text-black transition-colors duration-300 text-sm font-light">Size Guide</a></li>
              <li><a href="#" className="text-black/60 hover:text-black transition-colors duration-300 text-sm font-light">Returns</a></li>
              <li><a href="#" className="text-black/60 hover:text-black transition-colors duration-300 text-sm font-light">Shipping</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-8 text-black/80">Inner Circle</h4>
            <p className="text-black/60 text-sm mb-6 leading-relaxed font-light">
              Exclusive previews, editorial edits, and early access.
            </p>
            <form className="flex group">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-b border-black/20 py-3 px-0 text-sm w-full focus:border-black focus:outline-none text-black placeholder-black/40 transition-colors rounded-none font-light tracking-wide"
              />
              <button 
                type="submit" 
                className="text-xs uppercase tracking-widest text-black/50 hover:text-black transition-colors border-b border-black/20 group-focus-within:border-black px-2 shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center border-t border-black/5">
          <p className="text-black/40 text-[10px] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Kora Studios.
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="text-black/40 hover:text-black transition-colors text-[10px] uppercase tracking-widest">Instagram</a>
            <a href="#" className="text-black/40 hover:text-black transition-colors text-[10px] uppercase tracking-widest">Pinterest</a>
            <a href="#" className="text-black/40 hover:text-black transition-colors text-[10px] uppercase tracking-widest">Journal</a>
          </div>
        </div>
      </div>

      {/* Massive Background Watermark */}
      <motion.div 
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0"
        style={{ y, opacity }}
      >
        <span className="text-[25vw] font-bold text-black/[0.02] uppercase tracking-tighter leading-none whitespace-nowrap">
          KORA
        </span>
      </motion.div>
    </footer>
  );
}
