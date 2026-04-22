'use client';

import { ProductCard } from '@/components/products/ProductCard';
import { ALL_PRODUCTS } from '@/store/useSearchStore';
import { useState, useEffect } from 'react';
import { ChevronDown, Filter, LayoutGrid, List } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

const CATEGORIES = ['All Departments', 'Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Appliances', 'Sports', 'Automotive', 'Groceries', 'Health'];
const BRANDS = ['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'Dyson', 'Nespresso', 'Kora Luxe'];

function ApparelContent() {
  const searchParams = useSearchParams();
  const querySearch = searchParams.get('search');
  const queryCategory = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState('All Departments');
  
  useEffect(() => {
    if (queryCategory) {
      setActiveCategory(queryCategory);
    } else if (querySearch) {
      setActiveCategory('Search Results');
    } else {
      setActiveCategory('All Departments');
    }
  }, [queryCategory, querySearch]);

  const products = ALL_PRODUCTS.filter(p => {
    const matchesCategory = (activeCategory === 'All Departments' || activeCategory === 'Search Results') 
      ? true 
      : p.category === activeCategory;
    
    const matchesSearch = querySearch 
      ? p.title.toLowerCase().includes(querySearch.toLowerCase()) || 
        p.brand?.toLowerCase().includes(querySearch.toLowerCase()) ||
        p.category.toLowerCase().includes(querySearch.toLowerCase()) 
      : true;
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F1F3F6] min-h-screen pb-24">
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link href="/" className="hover:text-[#2874F0]">Home</Link>
          <ChevronDown className="w-3 h-3 -rotate-90" />
          <span className="text-gray-900 font-bold">{querySearch ? `Search: ${querySearch}` : activeCategory}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 pt-8">
        <div className="flex gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-64 shrink-0 hidden lg:block space-y-6">
             <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                   <Filter className="w-4 h-4 text-gray-700" />
                   <h3 className="text-sm font-bold text-gray-700">Filters</h3>
                </div>
                <div className="p-4 space-y-6">
                   <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Categories</h4>
                      <div className="space-y-2">
                         {CATEGORIES.map(cat => (
                           <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                              <input 
                                type="checkbox" 
                                checked={activeCategory === cat}
                                onChange={() => setActiveCategory(cat)}
                                className="w-4 h-4 rounded border-gray-300 text-[#2874F0] focus:ring-[#2874F0]" 
                              />
                              <span className="text-xs text-gray-600 group-hover:text-[#2874F0] transition-colors">{cat}</span>
                           </label>
                         ))}
                      </div>
                   </div>

                   <div className="pt-6 border-t border-gray-100">
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Price Range</h4>
                      <div className="flex items-center gap-2">
                         <input type="text" placeholder="Min" className="w-full px-3 py-2 border border-gray-200 rounded text-xs outline-none focus:border-[#2874F0]" />
                         <span className="text-gray-300 font-bold">-</span>
                         <input type="text" placeholder="Max" className="w-full px-3 py-2 border border-gray-200 rounded text-xs outline-none focus:border-[#2874F0]" />
                      </div>
                   </div>

                   <div className="pt-6 border-t border-gray-100">
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Brand</h4>
                      <div className="space-y-2">
                         {BRANDS.map(brand => (
                           <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#2874F0] focus:ring-[#2874F0]" />
                              <span className="text-xs text-gray-600 group-hover:text-[#2874F0] transition-colors">{brand}</span>
                           </label>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
             <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-6">
                   <h1 className="text-lg font-bold text-gray-900">
                    {querySearch ? `Showing results for "${querySearch}"` : activeCategory} 
                    <span className="text-sm font-normal text-gray-400 ml-2">({products.length} products found)</span>
                   </h1>
                </div>
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      Sort By:
                      <div className="flex items-center gap-1 cursor-pointer hover:text-[#2874F0]">
                         Popularity <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                   </div>
                   <div className="flex items-center border border-gray-100 rounded overflow-hidden">
                      <button className="p-1.5 bg-gray-50 text-[#2874F0]"><LayoutGrid className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-gray-50 text-gray-300"><List className="w-4 h-4" /></button>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map((product) => <ProductCard key={product.id} product={product as any} />)
                ) : (
                  <div className="col-span-full py-24 text-center bg-white rounded-xl border border-dashed border-gray-200">
                     <p className="text-gray-400 font-medium">We couldn't find any products matching your criteria.</p>
                     <button onClick={() => setActiveCategory('All Departments')} className="mt-4 text-[#2874F0] font-bold text-sm hover:underline">Clear all filters</button>
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ApparelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F1F3F6] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#2874F0] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ApparelContent />
    </Suspense>
  );
}
