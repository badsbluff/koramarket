'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFAFA]">
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 bg-black/5"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center grayscale-[10%] opacity-90"
          />
        </motion.div>
        
        {/* Soft Bright Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/20 to-transparent z-10" />
      </div>

      <div className="relative z-20 text-center px-4 w-full max-w-7xl mx-auto pt-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="glass-panel px-6 py-2 rounded-full inline-block">
              <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-black/90 font-mono">
                Premium Collection
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-10 w-full relative">
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-medium tracking-tighter text-[#0A0A0A] leading-[0.8] relative z-10">
              <span className="font-serif italic text-black/80 block -mb-4 md:-mb-12 ml-[-20%]">Lumina</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/40">Pearl</span>
            </h1>
            {/* Internal Glow Behind Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-40 bg-white/30 blur-[100px] pointer-events-none" />
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-md mx-auto mb-16">
            <p className="text-black/80 text-sm md:text-base font-light leading-relaxed">
              Transcending traditional luxury. A capsule of floating forms, soft silk, and crystalline structures designed for the bold.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/collections/ethereal" className="group inline-flex items-center justify-center glass-panel px-12 py-5 uppercase tracking-[0.3em] text-[10px] font-medium text-black hover:text-[#0A0A0A] transition-all duration-500 rounded-full hover:bg-white/80">
              Enter The Collection
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <div className="flex items-center gap-6">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-black/60">
            Scroll to Explore
          </p>
        </div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-black/20 to-transparent"></div>
      </motion.div>

      {/* Side Decorative Elements */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-left z-20 group cursor-pointer items-center">
        <div className="w-8 h-[1px] bg-black/20 group-hover:w-16 transition-all duration-500"></div>
        <span className="text-[10px] font-mono text-black/40 uppercase tracking-widest pl-2 group-hover:text-black transition-colors">Scroll</span>
      </div>
    </div>
  );
}
