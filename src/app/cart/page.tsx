'use client';

import { useCartStore, CartItem } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ShieldCheck, ChevronRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const { user } = useAuthStore();
  const router = useRouter();

  const totalAmount = getCartTotal();
  const shipping = totalAmount > 499 ? 0 : 49;
  const discount = Math.round(totalAmount * 0.15); // Simulated 15% discount
  const finalTotal = totalAmount + shipping - discount;

  const handlePlaceOrder = () => {
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#f1f3f6] p-4">
        <div className="bg-white p-12 rounded-xl shadow-sm text-center max-w-lg w-full">
          <div className="w-48 h-48 mx-auto mb-6 bg-indigo-50 rounded-full flex items-center justify-center">
             <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="Empty Cart" className="w-32 h-32 object-contain opacity-80" />
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Your cart is empty!</h2>
          <p className="text-gray-400 text-sm font-medium mb-8">Add items to it now to start your style journey.</p>
          <Link href="/apparel" className="bg-[#2874f0] text-white px-10 py-3.5 rounded-lg font-black uppercase text-sm shadow-lg hover:shadow-indigo-200 transition-all">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F3F6] pb-24">
      <div className="max-w-[1400px] mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white p-4 rounded-t-xl border-b border-gray-100 flex items-center justify-between">
               <h1 className="text-base font-black text-gray-800 uppercase tracking-wider">My Cart ({items.length})</h1>
               <div className="flex items-center gap-2 text-xs font-black text-gray-500">
                  <MapPin className="w-3.5 h-3.5" />
                  Deliver to: <span className="text-gray-900">New York - 10001</span>
               </div>
            </div>

            <div className="bg-white shadow-sm overflow-hidden rounded-b-xl divide-y divide-gray-100">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Item Image */}
                    <div className="w-28 h-28 shrink-0 mx-auto sm:mx-0">
                      <Link href={`/products/${item.product_id}`}>
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-contain p-2 bg-white border border-gray-100 rounded-lg" 
                        />
                      </Link>
                      <div className="mt-4 flex items-center justify-center border border-gray-100 rounded-md overflow-hidden bg-white">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-50 transition-colors text-gray-500"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-black text-gray-900 border-x border-gray-100">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-50 transition-colors text-gray-500"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                         <Link href={`/products/${item.product_id}`} className="text-[15px] font-medium text-gray-800 hover:text-[#2874f0] transition-colors line-clamp-1">
                            {item.title}
                         </Link>
                         <p className="text-[17px] font-black text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.category}</p>
                      <p className="text-xs font-black text-[#388e3c]">Special Price: extra 15% off included</p>
                      
                      <div className="flex items-center gap-6 pt-4">
                         <button 
                          onClick={() => removeItem(item.id)}
                          className="text-[13px] font-black text-gray-700 hover:text-red-500 transition-colors flex items-center gap-2 uppercase tracking-wide"
                         >
                            <Trash2 className="w-4 h-4" /> Remove
                         </button>
                         <button className="text-[13px] font-black text-gray-700 hover:text-[#2874f0] transition-colors flex items-center gap-2 uppercase tracking-wide">
                            <Heart className="w-4 h-4" /> Save For Later
                         </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Bottom Checkout Button Area */}
            <div className="bg-white p-4 shadow-md flex justify-end rounded-xl">
               <button 
                onClick={handlePlaceOrder}
                className="bg-[#fb641b] text-white px-14 py-4 rounded-sm font-black uppercase text-sm shadow-lg hover:shadow-orange-200 transition-all active:scale-95"
               >
                 Place Order
               </button>
            </div>
          </div>

          {/* Right Column: Price Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
             <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                   <h2 className="text-[13px] font-black text-gray-400 uppercase tracking-widest">Price Details</h2>
                </div>
                <div className="p-6 space-y-4">
                   <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-700">Price ({items.length} items)</span>
                      <span className="text-gray-900">${totalAmount.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-700">Discount</span>
                      <span className="text-[#388e3c] font-black">− ${discount.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-700">Shipping Fee</span>
                      <span className={shipping === 0 ? 'text-[#388e3c] font-black' : 'text-gray-900 underline'}>
                        {shipping === 0 ? 'FREE' : `$${shipping}`}
                      </span>
                   </div>
                   
                   <div className="border-t border-dashed border-gray-200 pt-5 mt-5 flex justify-between">
                      <span className="text-base font-black text-gray-800">Total Amount</span>
                      <span className="text-base font-black text-gray-800">${finalTotal.toLocaleString()}</span>
                   </div>
                </div>
                <div className="p-4 bg-green-50/50 border-t border-green-100">
                   <p className="text-sm font-black text-[#388e3c] text-center">
                     You will save ${discount.toLocaleString()} on this order!
                   </p>
                </div>
             </div>

             <div className="mt-4 flex items-center gap-3 px-4 text-gray-400 text-xs font-bold uppercase tracking-widest justify-center">
                <ShieldCheck className="w-5 h-5 opacity-40 shrink-0" />
                <span>Safe and Secure Payments. 100% Authentic products.</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
