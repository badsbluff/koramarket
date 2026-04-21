'use client';

import { useState, useRef } from 'react';
import { X, Ruler } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { motion, useScroll, useTransform } from 'framer-motion';

const PRODUCT = {
  id: 'prod_a1',
  title: 'Carbon Mesh Coat',
  price: 8999,
  description: 'A masterpiece of structural avant-garde design. Tailored from a premium proprietary carbon-infused wool blend. Its stark architectural shoulders and relaxed, flowing body create a silhouette that absorbs light and memory.',
  material: '80% Wool, 20% Carbon-Nylon Matrix',
  images: [
    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1000&auto=format&fit=crop'
  ],
  sizes: ['XS', 'S', 'M', 'L']
};

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const { addItem, openCart } = useCartStore();
  const infoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: infoRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    addItem({
      id: PRODUCT.id,
      product_id: PRODUCT.id,
      title: PRODUCT.title,
      price: PRODUCT.price,
      quantity: 1,
      image: PRODUCT.images[0],
      size: selectedSize
    });
    openCart();
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-black pt-24 md:pt-0 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[#D4AF37]/5 blur-[150px] pointer-events-none mix-blend-multiply" />
      
      <div className="flex flex-col md:flex-row relative z-10">
        {/* Sticky Editorial Gallery on Desktop */}
        <div className="w-full md:w-1/2 md:h-screen md:sticky md:top-0 overflow-y-auto hide-scrollbar flex flex-col border-r border-black/5 bg-[#FAFAFA]">
          {PRODUCT.images.map((img, idx) => (
            <motion.div 
               key={idx} 
               className="w-full h-[80vh] md:h-screen shrink-0 relative bg-[#FAFAFA]"
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ amount: 0.5 }}
               transition={{ duration: 1 }}
            >
              <img src={img} alt="" className="w-full h-full object-cover object-center grayscale-[10%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/10 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Product Info */}
        <div ref={infoRef} className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-transparent relative">
          
          <motion.div 
            className="w-full max-w-md relative z-10"
            style={{ y }}
          >
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-[0.4em] font-mono text-black/50">Outerwear</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-black mb-6 leading-tight tracking-tighter">
              {PRODUCT.title}
            </h1>
            <p className="text-xl text-black/80 mb-12 font-mono tracking-widest">₹{PRODUCT.price}</p>
            
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6 border-b border-black/10 pb-4">
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-black/70">Select Size</span>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[10px] uppercase tracking-[0.3em] text-black/90 flex items-center hover:text-black transition-colors border border-black/10 px-3 py-1.5 rounded-full"
                >
                  <Ruler className="w-3 h-3 mr-2" /> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {PRODUCT.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 text-[10px] uppercase font-mono tracking-[0.2em] transition-all duration-300 rounded-lg backdrop-blur-md shadow-sm
                      ${selectedSize === size 
                        ? 'border border-black glass-panel text-black bg-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)]' 
                        : 'border border-black/10 text-black/60 hover:border-black/30 bg-white/40 hover:bg-white/80'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full glass-panel bg-white/80 text-black py-5 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-black hover:text-white transition-colors rounded-xl mb-16 shadow-xl border border-black/5"
            >
              Add to Cart
            </motion.button>

            <div className="space-y-8 border-t border-black/10 pt-12">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-black mb-4 font-mono">Description</h3>
                <p className="text-sm text-black/60 font-light leading-relaxed">{PRODUCT.description}</p>
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-black mb-4 font-mono">Material</h3>
                <p className="text-sm text-black/60 font-light leading-relaxed">{PRODUCT.material}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Size Guide Modal with Framer Motion */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-panel bg-[#FAFAFA]/80 backdrop-blur-2xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-2xl shadow-2xl relative border border-black/5 rounded-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-8 border-b border-black/5 bg-[#FAFAFA]">
              <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-black/90">Sizing Reference</h2>
              <button onClick={() => setIsSizeGuideOpen(false)} className="text-black/40 hover:text-black transition-colors">
                <X className="w-6 h-6" strokeWidth={1} />
              </button>
            </div>
            <div className="p-8 bg-white">
              <table className="w-full text-left font-light">
                <thead className="border-b border-black/10 text-black/40">
                  <tr>
                    <th className="py-6 px-6 text-[10px] uppercase tracking-[0.2em]">Size</th>
                    <th className="py-6 px-6 text-[10px] uppercase tracking-[0.2em]">Standard</th>
                    <th className="py-6 px-6 text-[10px] uppercase tracking-[0.2em] text-right">Chest (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-black/80 text-sm">
                  <tr className="hover:bg-black/5 transition-colors">
                     <td className="py-6 px-6 font-mono">S</td>
                     <td className="py-6 px-6">XS</td>
                     <td className="py-6 px-6 text-right text-black/60 font-mono">32 - 34</td>
                  </tr>
                  <tr className="hover:bg-black/5 transition-colors">
                     <td className="py-6 px-6 font-mono">M</td>
                     <td className="py-6 px-6">S</td>
                     <td className="py-6 px-6 text-right text-black/60 font-mono">34 - 36</td>
                  </tr>
                  <tr className="hover:bg-black/5 transition-colors">
                     <td className="py-6 px-6 font-mono">L</td>
                     <td className="py-6 px-6">M</td>
                     <td className="py-6 px-6 text-right text-black/60 font-mono">36 - 38</td>
                  </tr>
                  <tr className="hover:bg-black/5 transition-colors">
                     <td className="py-6 px-6 font-mono">XL</td>
                     <td className="py-6 px-6">L</td>
                     <td className="py-6 px-6 text-right text-black/60 font-mono">38 - 40</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
