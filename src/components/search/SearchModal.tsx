'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Search as SearchIcon } from 'lucide-react';
import { useSearchStore, ALL_PRODUCTS } from '@/store/useSearchStore';
import Link from 'next/link';

export function SearchModal() {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useSearchStore();

  const filteredProducts = ALL_PRODUCTS.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div 
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 z-[60] bg-white/95 flex flex-col pt-32 px-6 md:px-24"
        >
          <button 
            onClick={closeSearch}
            className="absolute top-8 right-8 p-2 text-black/50 hover:text-black transition-colors"
          >
            <X className="w-8 h-8" strokeWidth={1} />
          </button>

          <div className="max-w-4xl w-full mx-auto relative mb-16">
            <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-black/20" strokeWidth={1} />
            <input 
              autoFocus
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..." 
              className="w-full bg-transparent border-b border-black/10 py-6 pl-16 pr-4 text-4xl md:text-6xl font-light focus:border-black outline-none transition-colors text-black placeholder-black/40"
            />
          </div>

          <div className="max-w-7xl w-full mx-auto overflow-y-auto pb-24 hide-scrollbar">
             {searchQuery.length > 0 && (
                <div>
                   <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-black/50 mb-8">
                     Found {filteredProducts.length} Results
                   </p>
                   
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                     {filteredProducts.map((product) => (
                        <Link 
                          key={product.id} 
                          href={`/products/${product.product_id}`}
                          onClick={closeSearch}
                          className="group block"
                        >
                          <div className="aspect-[4/5] bg-[#FAFAFA] rounded-2xl overflow-hidden mb-4 relative p-1 glass-panel">
                            <img 
                              src={product.image} 
                              alt={product.title} 
                              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 grayscale-[10%]"
                            />
                          </div>
                          <h4 className="text-sm font-medium text-black group-hover:text-black/70 transition-colors uppercase tracking-wider">{product.title}</h4>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-[10px] font-mono text-black/40 tracking-widest">{product.category}</p>
                            <p className="text-xs font-mono text-black/80 tracking-widest">₹{product.price}</p>
                          </div>
                        </Link>
                     ))}
                   </div>
                   
                   {filteredProducts.length === 0 && (
                     <div className="text-center pt-24 text-black/40">
                       <p className="text-sm font-mono tracking-widest uppercase">No assets found</p>
                     </div>
                   )}
                </div>
             )}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
