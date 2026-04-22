'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { 
  Plus, 
  Minus, 
  Trash2, 
  Truck, 
  Store, 
  CreditCard, 
  Wallet, 
  Smartphone, 
  ChevronLeft, 
  X,
  CreditCard as CardIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getCartTotal, 
    selectedShipping, 
    selectedPayment, 
    setShipping, 
    setPayment,
    seedDummyData 
  } = useCartStore();
  const { user } = useAuthStore();
  const router = useRouter();

  // Seed dummy data if cart is empty (for demo purposes)
  useEffect(() => {
    seedDummyData();
  }, [seedDummyData]);

  const subtotal = getCartTotal();
  const shippingFee = selectedShipping === 'home' ? 9.90 : 0;
  const finalTotal = subtotal + shippingFee;

  const handleCheckout = () => {
    // Navigate to checkout where state is already synced via the store
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50/50 p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <X className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Your Cart is Empty</h2>
          <p className="text-gray-400 font-medium mb-10">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            href="/apparel" 
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-gray-800 transition-all shadow-lg active:scale-95"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 pt-12">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex items-end justify-between mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">My Cart</h1>
          <Link 
            href="/apparel" 
            className="flex items-center gap-2 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Continue shopping
          </Link>
        </div>

        {/* Unified Cart Container */}
        <div className="bg-white rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100">
          
          {/* Cart Table Headers - Hidden on Mobile */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-10 py-8 border-b border-gray-50 text-[11px] font-black text-gray-300 uppercase tracking-[0.2em]">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Cart Items */}
          <div className="divide-y divide-gray-50">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-12 gap-4 px-6 md:px-10 py-8 md:py-10 items-center group relative"
                >
                  {/* Product Info */}
                  <div className="col-span-12 md:col-span-6 flex gap-4 md:gap-6 items-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center p-2 shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <Link href={`/products/${item.product_id}`} className="text-base md:text-lg font-black text-gray-900 hover:text-red-500 transition-colors block truncate">
                        {item.title}
                      </Link>
                      <p className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">#{item.id.slice(0, 8)}</p>
                      <p className="hidden md:block text-xs text-gray-400 font-medium pt-1">
                        Category: <span className="text-gray-600 font-bold">{item.category}</span>
                      </p>
                    </div>
                  </div>

                  {/* Price - Hidden on Mobile */}
                  <div className="hidden md:block col-span-2 text-center">
                    <p className="text-base font-black text-gray-900">${item.price.toLocaleString()}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-6 md:col-span-2 flex md:justify-center">
                    <div className="flex items-center gap-3 md:gap-4 bg-gray-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs md:text-sm font-black text-gray-900 w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Total & Remove */}
                  <div className="col-span-6 md:col-span-2 text-right relative">
                    <p className="text-base md:text-lg font-black text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute -right-4 top-1/2 -translate-y-1/2 md:opacity-0 group-hover:opacity-100 transition-all text-gray-300 hover:text-red-500 p-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Bottom Section: Shipping & Payment & Summary */}
          <div className="bg-gray-50/50 p-6 md:p-10 border-t border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Side: Choices */}
              <div className="lg:col-span-7 space-y-8">
                {/* Shipping Selection */}
                <div className="space-y-4">
                  <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-widest">Choose shipping mode:</h3>
                  <div className="space-y-3">
                    <label 
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedShipping === 'pickup' ? 'border-red-500 bg-white shadow-md' : 'border-gray-100 bg-white/50 hover:border-gray-200'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={selectedShipping === 'pickup'} 
                        onChange={() => setShipping('pickup')}
                        className="hidden" 
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedShipping === 'pickup' ? 'border-red-500 bg-red-500' : 'border-gray-200'}`}>
                        {selectedShipping === 'pickup' && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-[13px] font-black text-gray-900">Store pickup <span className="text-gray-400 font-medium ml-2">(In 20 min)</span></p>
                          <p className="text-[13px] font-black text-gray-900 uppercase">Free</p>
                        </div>
                      </div>
                    </label>

                    <label 
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedShipping === 'home' ? 'border-red-500 bg-white shadow-md' : 'border-gray-100 bg-white/50 hover:border-gray-200'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={selectedShipping === 'home'} 
                        onChange={() => setShipping('home')}
                        className="hidden" 
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedShipping === 'home' ? 'border-red-500 bg-red-500' : 'border-gray-200'}`}>
                        {selectedShipping === 'home' && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-[13px] font-black text-gray-900">Delivery at home <span className="text-gray-400 font-medium ml-2">(Under 2-4 days)</span></p>
                            <p className="text-[11px] text-gray-400 font-medium mt-0.5">At 43 Glonridgo Ave, Brooklyn, NY 11220</p>
                          </div>
                          <p className="text-[13px] font-black text-gray-900 uppercase">9.90</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-4">
                  <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-widest">Choose payment method:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'card', label: 'Credit Card', icon: CardIcon },
                      { id: 'upi', label: 'UPI / Net', icon: Smartphone },
                      { id: 'wallet', label: 'Wallets', icon: Wallet },
                    ].map((method) => (
                      <label 
                        key={method.id}
                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                          selectedPayment === method.id ? 'border-gray-900 bg-white shadow-md' : 'border-gray-100 bg-white/50 hover:border-gray-200'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="payment" 
                          checked={selectedPayment === (method.id as any)} 
                          onChange={() => setPayment(method.id as any)}
                          className="hidden" 
                        />
                        <method.icon className={`w-6 h-6 ${selectedPayment === method.id ? 'text-gray-900' : 'text-gray-300'}`} />
                        <p className={`text-[11px] font-black uppercase tracking-wider ${selectedPayment === method.id ? 'text-gray-900' : 'text-gray-400'}`}>
                          {method.label}
                        </p>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Price Summary */}
              <div className="lg:col-span-5 flex flex-col justify-end">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest">
                      <span>Subtotal (TTC)</span>
                      <span className="text-gray-900">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest">
                      <span>Shipping</span>
                      <span className="text-gray-900">{shippingFee === 0 ? 'Free' : `$${shippingFee.toLocaleString()}`}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-6 border-t border-gray-100">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Total</span>
                    <span className="text-3xl font-black text-gray-900">${finalTotal.toLocaleString()}</span>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-[#FF4B4B] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-[0_20px_40px_-10px_rgba(255,75,75,0.3)] hover:shadow-[0_24px_48px_-12px_rgba(255,75,75,0.4)] hover:bg-[#FF3B3B] transition-all active:scale-[0.98] flex items-center justify-between px-10"
                  >
                    <span>Checkout</span>
                    <span>${finalTotal.toLocaleString()}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Security / Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest">
            <Truck className="w-5 h-5" /> Fast Delivery
          </div>
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest">
            <CardIcon className="w-5 h-5" /> Secure Payment
          </div>
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest">
            <Store className="w-5 h-5" /> Easy Returns
          </div>
        </div>

      </div>
    </div>
  );
}
