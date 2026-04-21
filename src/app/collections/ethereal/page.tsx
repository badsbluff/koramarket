'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const COLLECTION_DATA = [
  { id: 'e1', title: 'Lumina Overcoat', price: 12000, image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=800&auto=format&fit=crop' },
  { id: 'e2', title: 'Liquid Form Dress', price: 9500, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop' },
  { id: 'e3', title: 'Crystalline Structure', price: 4200, image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=800&auto=format&fit=crop' },
];

export default function EtherealCollectionPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black pt-32 pb-24 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-[#D4AF37]/10 blur-[100px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-[#3b82f6]/5 blur-[120px] pointer-events-none mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5 }}
          className="text-center mb-32"
        >
          <span className="text-xs uppercase tracking-[0.4em] font-mono text-black/60 mb-6 block">Volume 01</span>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-black to-black/40">
            Lumina <br/> <span className="font-serif italic text-black/60">Pearl</span>
          </h1>
          <p className="max-w-xl mx-auto text-black/70 font-light leading-relaxed">
            An exploration of material clarity. Bridging the physical and digital through hyper-visible silhouettes, liquid reflections, and soft layering. 
          </p>
        </motion.div>

        {/* Collection Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center mb-32">
          
          {COMMODITY_ITEMS(COLLECTION_DATA[0], "col-span-1 md:col-span-6", 0)}
          
          <div className="col-span-1 md:col-span-6 md:pl-16 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="glass-panel bg-white/80 p-8 rounded-3xl shadow-sm"
            >
              <h3 className="text-xl font-serif italic text-black/90 mb-4 tracking-wide">"The silhouette should feel like pure light, entirely borderless."</h3>
              <p className="text-sm font-mono text-black/50 uppercase tracking-widest">- Chief Architect</p>
            </motion.div>
            
            {COMMODITY_ITEMS(COLLECTION_DATA[1], "col-span-1", 0.5)}
          </div>
          
        </div>

        {/* Full width feature */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="w-full aspect-[21/9] bg-black/5 rounded-[3rem] overflow-hidden glass-panel relative flex items-center justify-center mb-32 group shadow-sm"
        >
          <img src="https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-105 transition-transform duration-1000 grayscale-[20%]" alt="Radiance" />
          <h2 className="text-4xl md:text-7xl font-serif italic text-black relative z-10 tracking-widest">Radiance</h2>
        </motion.div>

      </div>
    </div>
  );
}

function COMMODITY_ITEMS(item: any, spanClass: string, delay: number) {
  return (
    <motion.div 
      className={`group relative ${spanClass}`}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay }}
    >
      <Link href="/products/prod_e1" className="block relative z-10 glass-panel bg-white/60 p-4 rounded-3xl transition-all duration-700 hover:bg-white shadow-sm hover:shadow-md">
        <div className="aspect-[4/5] bg-transparent overflow-hidden rounded-2xl relative mb-6">
           <img 
              src={item.image} 
              className="w-full h-full object-cover grayscale-[10%] scale-100 group-hover:scale-105 transition-transform duration-[2s] ease-out"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>
        <div className="px-4 pb-4 flex justify-between items-end border-t border-black/5 pt-4">
          <div>
            <h3 className="text-sm font-sans tracking-widest text-black/90 uppercase mb-1">{item.title}</h3>
            <p className="text-[10px] text-black/50 font-mono tracking-widest">Ed. 01</p>
          </div>
          <p className="text-sm text-black/80 font-mono tracking-tighter">₹{item.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}
