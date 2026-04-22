'use client';

import { useWishlistStore } from '@/store/useWishlistStore';
import { ProductCard } from '@/components/products/ProductCard';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishlistPage() {
  const { items } = useWishlistStore();

  return (
    <main className="min-h-screen bg-[#fcfaff] py-12">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
           <div className="flex items-center gap-4">
              <Link href="/" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                 <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                 Your Wishlist <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              </h1>
           </div>
           <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">
              {items.length} Items Saved
           </p>
        </div>

        <AnimatePresence mode="wait">
          {items.length > 0 ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8"
            >
              {items.map((item) => (
                <ProductCard 
                  key={item.product_id} 
                  product={{
                    id: item.product_id,
                    product_id: item.product_id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    category: 'Wishlist',
                    rating: 4.8, // Fallback for wishlist
                    ratingCount: 1200,
                  } as any} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
               <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-purple-100 mb-8">
                  <Heart className="w-10 h-10 text-gray-200" />
               </div>
               <h2 className="text-2xl font-black text-gray-900 mb-4">Your wishlist is empty</h2>
               <p className="text-gray-400 font-medium mb-10 max-w-[300px]">Save your favorite items here to keep an eye on them!</p>
               <Link href="/apparel" className="bg-purple-600 text-white px-10 py-4 rounded-full font-black text-sm hover:scale-105 transition-all shadow-xl shadow-purple-200 active:scale-95">
                  Start Shopping
               </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
