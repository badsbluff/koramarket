'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal, Check } from 'lucide-react';

interface AdvancedFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'One Size'];

export function AdvancedFilter({ isOpen, onClose, onApply }: AdvancedFilterProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [isApplying, setIsApplying] = useState(false);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleApply = () => {
    setIsApplying(true);
    // Simulate complex progressive disclosure loading state (800ms)
    setTimeout(() => {
      setIsApplying(false);
      onApply({ sizes: selectedSizes, priceRange });
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setSelectedSizes([]);
    setPriceRange([0, 20000]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto md:left-auto md:right-0 md:w-[480px] md:h-screen bg-white shadow-2xl z-[70] rounded-t-3xl md:rounded-none md:border-l border-black/5 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/5">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" strokeWidth={1.5} />
                <h2 className="text-xl font-light">Filters</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-12">
              
              {/* Progressive Size Disclosure (Pills) */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-black/40 mb-4">Tactile Sizes</h3>
                <div className="flex flex-wrap gap-3">
                  {SIZES.map(size => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                          isSelected 
                            ? 'bg-black text-white shadow-md' 
                            : 'bg-black/5 text-black hover:bg-black/10'
                        }`}
                      >
                        {isSelected && (
                          <motion.div layoutId="size-active" className="absolute inset-0 bg-black" />
                        )}
                        <span className="relative z-10 flex items-center justify-center gap-2">
                           {size}
                           {isSelected && <Check className="w-3 h-3" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range (Simulated Slider) */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-black/40">Price Spectrum</h3>
                  <p className="font-mono text-sm text-black/80">₹{priceRange[0]} - ₹{priceRange[1]}</p>
                </div>
                <div className="h-16 bg-black/5 rounded-xl border border-black/5 flex items-center justify-center relative px-8 cursor-col-resize group">
                   {/* Decorative visual bars mimicking a histogram */}
                   <div className="absolute inset-x-8 bottom-0 h-8 flex items-end justify-between gap-1 opacity-20 pointer-events-none">
                      {Array.from({length: 24}).map((_, i) => (
                        <div key={i} className="flex-1 bg-black rounded-t-sm" style={{ height: (Math.random() * 100) + '%' }} />
                      ))}
                   </div>
                   <input 
                     type="range" 
                     min="0" max="20000" step="1000"
                     value={priceRange[1]}
                     onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                     className="w-full absolute inset-0 opacity-0 cursor-pointer z-10"
                   />
                   <div className="absolute left-8 right-8 h-1 bg-black/10 rounded-full pointer-events-none">
                     <div 
                       className="h-full bg-black rounded-full transition-all duration-75" 
                       style={{ width: ((priceRange[1] / 20000) * 100) + '%' }} 
                     />
                   </div>
                   {/* Custom thumb */}
                   <div 
                     className="absolute w-6 h-6 bg-white border-2 border-black rounded-full shadow-lg -translate-x-1/2 pointer-events-none transition-all duration-75"
                     style={{ left: 'calc(2rem + ' + ((priceRange[1] / 20000) * (100 - 4)) + '%)' }} // 2rem is px-8 offset approx
                   />
                </div>
              </div>

            </div>

            {/* Footer Action */}
            <div className="p-6 border-t border-black/5 bg-white flex items-center justify-between gap-4">
              <button 
                onClick={handleClear}
                className="text-xs font-mono uppercase tracking-widest text-black/40 hover:text-black transition-colors underline-offset-4 hover:underline px-4 py-2"
              >
                Clear All
              </button>
              <button 
                onClick={handleApply}
                disabled={isApplying}
                className="flex-1 bg-black text-white py-4 rounded-xl text-xs font-medium uppercase tracking-[0.2em] shadow-lg hover:bg-[#222] transition-colors disabled:opacity-70 disabled:cursor-wait relative overflow-hidden"
              >
                {isApplying ? (
                  <motion.span 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                    className="flex justify-center items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </motion.span>
                ) : (
                  'Show Results'
                )}
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
