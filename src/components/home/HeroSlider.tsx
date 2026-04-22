'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const SLIDES = [
  {
    title: 'The new-tech gift you are wishing for is right here',
    subtitle: 'Big screens in incredibly slim designs that fit in your hand.',
    buttonText: 'Shop Now',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop',
    color: 'bg-white',
    link: '/apparel?category=Mobiles'
  },
  {
    title: 'Experience Premium High-Fidelity Audio',
    subtitle: 'Active noise cancellation with 40-hour battery life.',
    buttonText: 'Discover More',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop',
    color: 'bg-[#F8F9FA]',
    link: '/apparel?category=Headphones'
  }
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-[500px] relative overflow-hidden bg-white shadow-sm rounded-2xl group border border-gray-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 flex items-center px-16 md:px-24 ${SLIDES[current].color}`}
        >
          <div className="max-w-md relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#2874F0] text-[11px] font-black uppercase tracking-[0.2em] mb-4"
            >
              New Launch
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-6"
            >
              {SLIDES[current].title.split(' ').map((word, i) => (
                <span key={i} className={word.toLowerCase() === 'here' || word.toLowerCase() === 'right' ? 'text-[#FB641B]' : ''}>
                  {word}{' '}
                </span>
              ))}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-sm mb-10 leading-relaxed font-medium"
            >
              {SLIDES[current].subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                href={SLIDES[current].link}
                className="group flex items-center gap-3 bg-[#FB641B] text-white px-10 py-3.5 font-bold text-sm rounded-lg hover:bg-[#e65c19] transition-all relative overflow-hidden"
              >
                <div className="relative z-10 flex items-center gap-2">
                  {SLIDES[current].buttonText}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          </div>
          
          <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none">
            <motion.img 
              key={current}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={SLIDES[current].image} 
              alt="Hero" 
              className="w-full h-full object-cover object-center translate-x-4" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:from-inherit" />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 left-16 md:left-24 flex gap-2.5 z-20">
        {SLIDES.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 bg-gray-200 overflow-hidden relative ${current === i ? 'w-10' : 'w-5'}`}
          >
            {current === i && (
              <motion.div 
                layoutId="hero-dot" 
                className="absolute inset-0 bg-[#2874F0]" 
                transition={{ duration: 8, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

