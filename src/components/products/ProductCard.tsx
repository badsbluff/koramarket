'use client';

import { Star, Heart, ShoppingCart, Info, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: {
    id: string;
    product_id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    ratingCount: number;
    originalPrice?: number;
    discount?: number;
    brand?: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, updateQuantity, removeItem, items } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.product_id);
  const discount = product.discount || 15;
  const originalPrice = product.originalPrice || Math.round(product.price * (1 + discount / 100));

  const cartItem = items.find((i) => i.id === product.id);
  const cartQuantity = cartItem?.quantity || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ ...product, quantity: 1, id: product.id });
  };

  const handleMinus = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartQuantity > 1) {
      updateQuantity(product.id, cartQuantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  const handlePlus = (e: React.MouseEvent) => {
    e.preventDefault();
    updateQuantity(product.id, cartQuantity + 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem({ 
      product_id: product.product_id, 
      title: product.title, 
      price: product.price, 
      image: product.image 
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-3 flex flex-col h-full relative group border border-gray-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
    >
      {/* Upper Badge Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1.5">
           <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm italic">-{discount}%</span>
           {product.rating > 4.7 && (
             <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-1.5 py-0.5 rounded-md border border-amber-200">BESTSELLER</span>
           )}
        </div>
        <button
          onClick={handleToggleWishlist}
          className={`p-1.5 rounded-full shadow-sm transition-all active:scale-75 ${isWishlisted ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-gray-50 text-gray-300 border border-gray-100 hover:text-red-400'}`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} strokeWidth={2.5} />
        </button>
      </div>

      {/* Image Container */}
      <Link href={`/products/${product.product_id}`} className="block aspect-[10/11] mb-3 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-3 relative group-hover:bg-indigo-50/30 transition-colors">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=400&auto=format&fit=crop'; }}
        />
        
        {/* Quick View Overlay (Small hint) */}
        <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
           <div className="bg-white/90 backdrop-blur-md rounded-lg py-1.5 text-[10px] font-black text-gray-700 text-center shadow-sm flex items-center justify-center gap-1.5 border border-white/50">
              <Info className="w-3 h-3" /> CLICK TO VIEW
           </div>
        </div>
      </Link>

      {/* Brand & Category */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">{product.brand || 'KORA'}</span>
        <div className="w-0.5 h-0.5 bg-gray-300 rounded-full" />
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</span>
      </div>

      {/* Title */}
      <h3 className="text-[12px] font-bold text-gray-800 line-clamp-2 mb-2 leading-tight min-h-[32px] group-hover:text-[#2874F0] transition-colors">
        {product.title}
      </h3>

      {/* Rating Row */}
      <div className="flex items-center gap-1.5 mb-3 bg-gray-50 w-fit px-2 py-0.5 rounded-full border border-gray-100">
        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
        <span className="text-[10px] font-black text-gray-700">{product.rating}</span>
        <span className="text-[10px] text-gray-400 border-l border-gray-200 pl-1.5">{(product.ratingCount / 1000).toFixed(1)}K</span>
      </div>

      {/* Price + Action Row */}
      <div className="flex items-end justify-between mt-auto gap-2">
        <div className="leading-none min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
             <p className="text-[14px] sm:text-[15px] font-black text-gray-900 tracking-tight leading-none">${product.price.toLocaleString()}</p>
             <span className="text-[9px] sm:text-[10px] text-gray-400 line-through font-bold leading-none">${originalPrice.toLocaleString()}</span>
          </div>
          <p className="text-[8px] sm:text-[9px] text-[#388e3c] font-black mt-1 uppercase tracking-tighter truncate w-full">FREE Delivery</p>
        </div>
        
        {cartQuantity > 0 ? (
          <div className="flex items-center bg-[#EEF2FF] rounded-xl p-1 gap-1.5 sm:gap-2 border border-[#E0E7FF] shadow-sm shrink-0">
            <button onClick={handleMinus} className="w-6 h-6 sm:w-7 sm:h-7 bg-white hover:bg-indigo-50 text-[#4F46E5] rounded-lg flex items-center justify-center transition-colors active:scale-95 shadow-sm">
              <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={3} />
            </button>
            <span className="text-[11px] sm:text-[12px] font-black text-[#4F46E5] w-2 sm:w-3 text-center">{cartQuantity}</span>
            <button onClick={handlePlus} className="w-6 h-6 sm:w-7 sm:h-7 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg flex items-center justify-center transition-colors active:scale-95 shadow-sm break-keep">
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={3} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-[#2874F0] hover:bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md hover:shadow-indigo-200 transition-all active:scale-90 relative overflow-hidden group/btn"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            <ShoppingCart className="w-4 h-4 relative" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
