'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export function CopilotOrb() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-28 right-6 z-[90] pb-[env(safe-area-inset-bottom)] pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{ transformOrigin: 'bottom right' }}
            className="absolute bottom-16 right-0 w-72 glass-panel p-5 rounded-[2rem] rounded-br-[0.5rem] pointer-events-auto border border-white/10"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
            <div className="flex gap-4 items-start pr-4">
              <div className="w-3 h-3 mt-1 rounded-full bg-[#2E5BFF] shadow-[0_0_15px_rgba(46,91,255,1)] animate-pulse shrink-0" />
              <div>
                <p className="text-xs text-white/90 font-medium mb-2 tracking-wide font-sans">Copilot Active</p>
                <p className="text-[11px] text-white/50 leading-relaxed font-light mb-4 text-balance">
                  I noticed you're browsing the platform. Would you like me to construct a personalized aesthetic matrix based on your session behavior?
                </p>
                <div className="flex gap-2">
                  <button className="bg-white text-black text-[9px] uppercase tracking-[0.2em] px-4 py-2 rounded-full font-medium hover:bg-[#2E5BFF] hover:text-white transition-colors">
                    Build Matrix
                  </button>
                  <button onClick={() => setIsOpen(false)} className="bg-white/5 text-white/60 text-[9px] uppercase tracking-[0.2em] px-4 py-2 rounded-full font-medium hover:bg-white/10 transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full relative flex items-center justify-center pointer-events-auto group outline-none"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2E5BFF] via-[#D4AF37] to-[#ff00ff] blur-md opacity-70 group-hover:opacity-100 transition-opacity animate-[spin_3s_linear_infinite]" />
        <div className="absolute inset-0.5 rounded-full bg-black z-10" />
        <Sparkles className={`w-5 h-5 relative z-20 transition-all duration-500 \${isOpen ? 'text-[#2E5BFF] drop-shadow-[0_0_5px_rgba(46,91,255,0.8)]' : 'text-white/80 group-hover:text-white'}`} strokeWidth={1.5} />
      </button>
    </div>
  );
}
