'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  const [step, setStep] = useState<'ADDRESS' | 'PAYMENT' | 'SUCCESS'>('ADDRESS');
  const { items, getCartTotal, clearCart, updateQuantity, removeItem } = useCartStore();
  const { user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'UPI' | 'PAYPAL' | 'APPLE'>('CARD');
  
  // Logistics Form State
  const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.name?.split(' ')[1] || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'ADDRESS') setStep('PAYMENT');
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      setStep('SUCCESS');
    }, 2000);
  };

  if (step === 'SUCCESS') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-[#FAFAFA] to-[#FAFAFA] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full text-center relative z-10"
        >
          <div className="w-24 h-24 mx-auto border border-black/10 glass-panel bg-white/60 rounded-full flex items-center justify-center mb-12 relative shadow-sm">
             <div className="absolute inset-0 rounded-full border border-black/10 animate-ping opacity-20"></div>
             <span className="text-black text-3xl font-light">✓</span>
          </div>
          <h1 className="text-4xl font-serif italic text-black mb-6">Order Confirmed</h1>
          <p className="text-black/60 mb-8 font-light leading-relaxed">Thank you for your purchase. Your order <span className="font-mono text-black">#KORA-{Math.floor(Math.random() * 100000)}</span> is confirmed.</p>
          
          <div className="glass-panel border-black/5 bg-white/60 p-8 mb-12 rounded-2xl text-left shadow-sm">
            <h3 className="text-[10px] uppercase tracking-widest text-black/50 mb-4 border-b border-black/5 pb-4">Shipping Details</h3>
            <div className="space-y-4 text-sm font-light">
               <div className="flex justify-between">
                 <span className="text-black/60">Status</span>
                 <span className="text-black">Processing</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-black/60">Est. Delivery</span>
                 <span className="text-black font-mono tracking-widest text-[11px]">3-5 Business Days</span>
               </div>
            </div>
          </div>
          
          <Link href="/" className="inline-block glass-panel bg-black/5 px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-medium text-black hover:bg-black hover:text-white transition-all rounded-full shadow-sm">
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24 relative overflow-hidden text-black">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-[150px] pointer-events-none mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex items-center space-x-6 mb-16 border-b border-black/10 pb-6">
            <div className={`text-[10px] uppercase tracking-[0.3em] font-medium ${step === 'ADDRESS' ? 'text-black' : 'text-black/40'}`}>1. Shipping</div>
            <div className="w-4 h-px bg-black/10"></div>
            <div className={`text-[10px] uppercase tracking-[0.3em] font-medium ${step === 'PAYMENT' ? 'text-black' : 'text-black/40'}`}>2. Payment</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Checkout Steps Form */}
          <div className="lg:col-span-7 space-y-12">
            <AnimatePresence mode="wait">
              {step === 'ADDRESS' && (
                <motion.form 
                  key="address-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleNextStep} 
                  className="space-y-8"
                >
                   <h2 className="text-2xl font-light tracking-wide text-black mb-8 border-b border-black/5 pb-4">Shipping Address</h2>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div>
                       <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-black/60 mb-2">First Name</label>
                       <input value={firstName} onChange={e => setFirstName(e.target.value)} required type="text" className="w-full bg-white/60 border border-black/10 p-4 text-sm focus:border-black outline-none transition-all rounded-lg text-black placeholder-black/20 shadow-sm" placeholder="Jane" />
                     </div>
                     <div>
                       <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-black/60 mb-2">Last Name</label>
                       <input value={lastName} onChange={e => setLastName(e.target.value)} required type="text" className="w-full bg-white/60 border border-black/10 p-4 text-sm focus:border-black outline-none transition-all rounded-lg text-black placeholder-black/20 shadow-sm" placeholder="Doe" />
                     </div>
                   </div>

                   <div>
                       <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-black/60 mb-2">Email Address</label>
                       <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="w-full bg-white/60 border border-black/10 p-4 text-sm focus:border-black outline-none transition-all rounded-lg text-black placeholder-black/20 shadow-sm" placeholder="jane@example.com" />
                   </div>

                   <div>
                       <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-black/60 mb-2">Address Line 1</label>
                       <input required type="text" className="w-full bg-white/60 border border-black/10 p-4 text-sm focus:border-black outline-none transition-all rounded-lg text-black placeholder-black/20 shadow-sm" placeholder="123 Main Street" />
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                     <div>
                       <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-black/60 mb-2">City</label>
                       <input required type="text" className="w-full bg-white/60 border border-black/10 p-4 text-sm focus:border-black outline-none transition-all rounded-lg text-black placeholder-black/20 shadow-sm" placeholder="New York" />
                     </div>
                     <div>
                       <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-black/60 mb-2">Postal Code</label>
                       <input required type="text" className="w-full bg-white/60 border border-black/10 p-4 text-sm focus:border-black outline-none transition-all rounded-lg text-black placeholder-black/20 shadow-sm" placeholder="10001" />
                     </div>
                   </div>

                   <button type="submit" className="w-full mt-8 border border-transparent bg-black py-5 text-[10px] uppercase tracking-[0.3em] font-medium text-white hover:bg-[#222] transition-all rounded-xl shadow-md">
                     Continue to Payment
                   </button>
                </motion.form>
              )}

              {step === 'PAYMENT' && (
                <motion.form 
                  key="payment-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleCheckout} 
                  className="space-y-8"
                >
                   <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-8">
                     <h2 className="text-2xl font-light tracking-wide text-black">Payment</h2>
                     <button type="button" onClick={() => setStep('ADDRESS')} className="text-[10px] uppercase tracking-[0.3em] text-black/50 hover:text-black transition-colors">
                       Edit Address
                     </button>
                   </div>

                   <div className="glass-panel p-6 rounded-2xl border border-black/5 bg-white/80 relative overflow-hidden shadow-sm">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                       <button type="button" onClick={() => setPaymentMethod('CARD')} className={`py-4 px-2 rounded-xl border flex flex-col items-center justify-center transition-all ${paymentMethod === 'CARD' ? 'border-black bg-white shadow-md' : 'border-black/5 bg-black/5 hover:bg-black/10 text-black/50'} text-black`}>
                         <span className="text-[10px] font-mono font-medium tracking-widest mt-2 uppercase">Card</span>
                       </button>
                       <button type="button" onClick={() => setPaymentMethod('UPI')} className={`py-4 px-2 rounded-xl border flex flex-col items-center justify-center transition-all ${paymentMethod === 'UPI' ? 'border-black bg-white shadow-md' : 'border-black/5 bg-black/5 hover:bg-black/10 text-black/50'} text-black`}>
                         <span className="text-[10px] font-mono font-medium tracking-widest mt-2 uppercase">UPI</span>
                       </button>
                       <button type="button" onClick={() => setPaymentMethod('PAYPAL')} className={`py-4 px-2 rounded-xl border flex flex-col items-center justify-center transition-all ${paymentMethod === 'PAYPAL' ? 'border-black bg-white shadow-md' : 'border-black/5 bg-black/5 hover:bg-black/10 text-black/50'} text-black`}>
                         <span className="text-[10px] font-mono font-medium tracking-widest mt-2 uppercase">PayPal</span>
                       </button>
                       <button type="button" onClick={() => setPaymentMethod('APPLE')} className={`py-4 px-2 rounded-xl border flex flex-col items-center justify-center transition-all ${paymentMethod === 'APPLE' ? 'border-black bg-white shadow-md' : 'border-black/5 bg-black/5 hover:bg-black/10 text-black/50'} text-black`}>
                         <span className="text-[10px] font-mono font-medium tracking-widest mt-2 uppercase">Apple Pay</span>
                       </button>
                     </div>

                     <div className="space-y-6 relative z-10 min-h-[140px]">
                       <AnimatePresence mode="wait">
                         {paymentMethod === 'CARD' && (
                           <motion.div 
                             key="card"
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -10 }}
                             className="space-y-6"
                           >
                             <div>
                               <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-black/60 mb-2">Card Number</label>
                               <input required type="text" className="w-full bg-transparent border-b border-black/20 pb-3 text-lg font-mono focus:border-black outline-none transition-colors text-black placeholder-black/30" placeholder="0000 0000 0000 0000" />
                             </div>
                             
                             <div className="grid grid-cols-2 gap-8">
                               <div>
                                 <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-black/60 mb-2">Expiry Date</label>
                                 <input required type="text" className="w-full bg-transparent border-b border-black/20 pb-3 text-sm focus:border-black outline-none transition-colors text-black placeholder-black/30" placeholder="MM/YY" />
                               </div>
                               <div>
                                 <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-black/60 mb-2">CVV</label>
                                 <input required type="text" className="w-full bg-transparent border-b border-black/20 pb-3 text-sm focus:border-black outline-none transition-colors text-black placeholder-black/30" placeholder="123" />
                               </div>
                             </div>
                           </motion.div>
                         )}
                         {paymentMethod === 'UPI' && (
                           <motion.div 
                             key="upi"
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -10 }}
                             className="flex flex-col items-center justify-center py-6 text-center"
                           >
                             <p className="text-sm text-black/60 font-light mb-4">Enter your registered UPI ID</p>
                             <input required type="text" className="w-full max-w-sm text-center bg-transparent border-b border-black/20 pb-3 text-lg focus:border-black outline-none transition-colors text-black placeholder-black/30" placeholder="username@bank" />
                           </motion.div>
                         )}
                         {(paymentMethod === 'PAYPAL' || paymentMethod === 'APPLE') && (
                           <motion.div 
                             key="external"
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -10 }}
                             className="flex flex-col items-center justify-center py-8 text-center"
                           >
                             <p className="text-sm text-black/60 font-light">You will be securely redirected to {paymentMethod === 'PAYPAL' ? 'PayPal' : 'Apple Pay'} upon clicking Pay Now.</p>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </div>
                   </div>

                   <button 
                     type="submit" 
                     disabled={isProcessing}
                     className="w-full mt-8 border border-transparent bg-black py-5 text-[10px] uppercase tracking-[0.3em] font-medium text-white hover:bg-[#222] transition-all rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center relative overflow-hidden group"
                   >
                     {isProcessing ? (
                       <span className="animate-pulse tracking-widest text-[#D4AF37]">Processing...</span>
                     ) : (
                       <span>Pay Now &bull; ₹{getCartTotal() + 150}</span>
                     )}
                   </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="glass-panel bg-white/60 p-8 rounded-[2rem] border border-black/5 sticky top-32 shadow-sm">
              <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-black mb-8 border-b border-black/5 pb-4">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-4 hide-scrollbar">
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-8 h-8 text-black/20 mx-auto mb-4" />
                    <p className="text-black/40 text-[10px] uppercase tracking-widest font-mono">Cart is Empty</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-24 bg-black/5 rounded-lg overflow-hidden shrink-0 border border-black/5">
                        <img src={item.image} alt="" className="w-full h-full object-cover grayscale-[10%]" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between pt-1">
                        <div>
                          <h4 className="text-sm text-black/90 mb-1">{item.title}</h4>
                          <p className="text-[10px] font-mono text-black/50 tracking-widest uppercase">Size {item.size}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-mono text-black/80 tracking-widest">₹{item.price}</p>
                          <div className="flex items-center border border-black/10 rounded glass-panel bg-white/60">
                            <button onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))} className="px-2 py-1 text-black/50 hover:text-black transition-colors"><Minus strokeWidth={1} className="w-3 h-3" /></button>
                            <span className="text-[10px] w-4 text-center font-mono text-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-black/50 hover:text-black transition-colors"><Plus strokeWidth={1} className="w-3 h-3" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-4 border-t border-black/5 pt-6 text-sm">
                <div className="flex justify-between text-black/60">
                  <span className="font-light">Subtotal</span>
                  <span className="font-mono text-black/80">₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-black/60">
                  <span className="font-light">Shipping</span>
                  <span className="font-mono text-black/80">₹150</span>
                </div>
                <div className="flex justify-between text-black uppercase tracking-widest font-medium pt-4 border-t border-black/10">
                  <span>Total</span>
                  <span className="font-mono text-[#D4AF37]">₹{getCartTotal() > 0 ? getCartTotal() + 150 : 0}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
