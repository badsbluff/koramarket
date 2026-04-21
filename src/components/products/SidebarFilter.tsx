'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FILTERS = {
  categories: ['Outerwear', 'Tops', 'Bottoms', 'Dresses'],
  price: ['Under ₹2499', '₹2499 - ₹4999', '₹4999 - ₹9999', 'Over ₹9999'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'One Size'],
  materials: ['Cotton', 'Linen', 'Wool', 'Silk Blend']
};

export function SidebarFilter() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    sizes: true,
    materials: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="w-full md:w-64 pr-8 border-r border-black/10 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto hidden md:block hide-scrollbar">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/20">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-black">Filters</h2>
        <button className="text-xs text-black/50 uppercase tracking-widest hover:text-black">Clear All</button>
      </div>

      {Object.entries(FILTERS).map(([section, options]) => (
        <div key={section} className="mb-6 border-b border-black/10 pb-6">
          <button 
            onClick={() => toggleSection(section)}
            className="flex items-center justify-between w-full text-left group"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-black/90 group-hover:text-black">{section}</h3>
            {expandedSections[section] ? (
              <ChevronUp className="w-4 h-4 text-black/50 group-hover:text-black" />
            ) : (
              <ChevronDown className="w-4 h-4 text-black/50 group-hover:text-black" />
            )}
          </button>
          
          {expandedSections[section] && (
            <div className="mt-4 space-y-3">
              {options.map((option) => (
                <label key={option} className="flex items-center cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="appearance-none w-4 h-4 border border-black/20 rounded-sm checked:bg-black checked:border-black transition-colors peer glass-panel bg-black/5"
                    />
                    <svg className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="ml-3 text-sm text-black/60 group-hover:text-black transition-colors">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </aside>
  );
}
