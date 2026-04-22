'use client';

import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { ALL_PRODUCTS } from '@/store/useSearchStore';
import { ProductCard } from '@/components/products/ProductCard';
import { ShoppingBag, Star, Tag, CreditCard, ChevronRight, MapPin, Share2, Heart } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  // Find product from master database
  const product = ALL_PRODUCTS.find(p => p.product_id === id) || ALL_PRODUCTS[0];
  const isWishlisted = isInWishlist(product.product_id);

  // Related products (same category, exclude current)
  const relatedProducts = ALL_PRODUCTS
    .filter(p => p.category === product.category && p.product_id !== product.product_id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({ ...product, quantity: 1, id: product.id });
  };

  const handleBuyNow = () => {
    addItem({ ...product, quantity: 1, id: product.id });
    router.push('/checkout');
  };

  const handleToggleWishlist = () => {
    toggleItem({ 
      product_id: product.product_id, 
      title: product.title, 
      price: product.price, 
      image: product.image 
    });
  };

  return (
    <div className="bg-[#F1F3F6] min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100 py-3 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center gap-2 text-[11px] font-medium text-gray-400">
          <Link href="/" className="hover:text-[#2874F0]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/apparel?category=${encodeURIComponent(product.category)}`} className="hover:text-[#2874F0]">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-bold">{product.title}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 pt-4">
        <div className="bg-white rounded shadow-sm p-4 lg:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[600px]">
          
          {/* Left: Image Section */}
          <div className="w-full lg:w-[450px] shrink-0">
             <div className="sticky top-24">
                <div className="aspect-square bg-white border border-gray-100 rounded p-4 flex items-center justify-center relative overflow-hidden group">
                   <img 
                    src={product.image} 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                    alt={product.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=600&auto=format&fit=crop'; }}
                   />
                   <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button 
                        onClick={handleToggleWishlist}
                        className={`p-2.5 rounded-full border border-gray-100 shadow-sm transition-all ${isWishlisted ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white/80 hover:bg-white text-gray-400'}`}
                      >
                         <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2.5 rounded-full border border-gray-100 bg-white/80 hover:bg-white text-gray-400 shadow-sm transition-all">
                         <Share2 className="w-5 h-5" />
                      </button>
                   </div>
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                   <button 
                    onClick={handleAddToCart}
                    className="bg-[#ff9f00] text-white py-4 rounded-sm font-black uppercase text-sm flex items-center justify-center gap-2 hover:shadow-md transition-all active:scale-95"
                   >
                     <ShoppingBag className="w-5 h-5" /> Add to Cart
                   </button>
                   <button 
                    onClick={handleBuyNow}
                    className="bg-[#fb641b] text-white py-4 rounded-sm font-black uppercase text-sm flex items-center justify-center gap-2 hover:shadow-md transition-all active:scale-95"
                   >
                     <CreditCard className="w-5 h-5" /> Buy Now
                   </button>
                </div>
             </div>
          </div>

          {/* Right: Info Section */}
          <div className="flex-1">
             <div className="mb-4">
                <h1 className="text-xl font-medium text-gray-800 mb-2">{product.title}</h1>
                <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1 bg-[#388e3c] text-white text-xs font-bold px-1.5 py-0.5 rounded-sm">
                      {product.rating} <Star className="w-3 h-3 fill-current" />
                   </div>
                   <span className="text-sm font-bold text-gray-400">{(product.ratingCount / 1000).toFixed(1)}K Ratings & 182 Reviews</span>
                   <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" className="h-[18px]" alt="Assured" />
                </div>
             </div>

             <div className="mb-6">
                <p className="text-[#388e3c] text-sm font-bold mb-1">Special Price</p>
                <div className="flex items-end gap-3 font-medium">
                   <span className="text-3xl font-bold">${product.price.toLocaleString()}</span>
                   <span className="text-gray-400 line-through text-sm">${product.originalPrice.toLocaleString()}</span>
                   <span className="text-[#388e3c] font-bold">{product.discount}% off</span>
                </div>
             </div>

             {/* Offers Section */}
             <div className="mb-8 space-y-4">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Available Offers</h3>
                <div className="space-y-2">
                   {[
                     'Bank Offer: 5% Unlimited Cashback on Kora Axis Bank Credit Card',
                     'Special Price: Get extra $100 off (price inclusive of cashback/coupon)',
                     'Partner Offer: Buy this product and get upto $50 off on next Home & Living purchase',
                   ].map((offer, i) => (
                     <div key={i} className="flex gap-3 items-start text-sm text-gray-700">
                        <Tag className="w-4 h-4 text-[#388e3c] shrink-0 mt-0.5" />
                        <span className="font-medium">{offer}</span>
                        <Link href="#" className="text-[#2874f0] font-bold text-[10px] uppercase min-w-fit">T&C</Link>
                     </div>
                   ))}
                </div>
             </div>

             {/* Delivery Section */}
             <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-6 border-t border-gray-100">
                <div className="md:col-span-2 text-gray-400 text-[13px] font-bold uppercase">Delivery</div>
                <div className="md:col-span-10">
                   <div className="flex items-center gap-2 border-b border-[#2874f0] w-fit mb-4 pb-1 cursor-pointer">
                      <MapPin className="w-4 h-4 text-[#2874f0]" />
                      <span className="text-sm font-bold">New York, NY - 10001</span>
                      <button className="text-[#2874f0] font-bold text-xs ml-4 uppercase">Change</button>
                   </div>
                   <p className="text-sm font-bold text-gray-800">Delivery by 25 Oct, Sunday | <span className="text-[#388e3c]">Free</span></p>
                   <p className="text-xs text-gray-400">If ordered within 12 hrs 34 mins</p>
                </div>
             </div>

             {/* Highlights Section */}
             <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-6 border-t border-gray-100">
                <div className="md:col-span-2 text-gray-400 text-[13px] font-bold uppercase">Highlights</div>
                <div className="md:col-span-10">
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-sm text-gray-700 font-medium list-disc list-inside">
                      <li>Premium {product.category} engineering</li>
                      <li>High-durability materials</li>
                      <li>1 Year Manufacturer Warranty</li>
                      <li>Standard retail quality control</li>
                   </ul>
                </div>
             </div>

             {/* Description Section */}
             <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-6 border-t border-gray-100">
                <div className="md:col-span-2 text-gray-400 text-[13px] font-bold uppercase">Description</div>
                <div className="md:col-span-10">
                   <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      The {product.title} represents the pinnacle of modern design in the {product.category} sector. 
                      Crafted for performance and aesthetics, it delivers an unparalleled user experience 
                      backed by artisanal craftsmanship and cutting-edge quality control.
                   </p>
                </div>
             </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 bg-white rounded shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p as any} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
