'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, CreditCard, ChevronRight, CheckCircle2, Wallet, Smartphone, Banknote, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'Pay via any UPI app' },
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, MasterCard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: Banknote, desc: 'All major banks' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, desc: 'Paytm, PhonePe & more' },
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when delivered' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<'ADDRESS' | 'PAYMENT' | 'SUCCESS'>('ADDRESS');
  const { items, clearCart, getCartTotal } = useCartStore();
  const { user } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: '',
    pincode: '',
    locality: '',
    addressLine: '',
    city: '',
    state: '',
  });
  const [orderNumber] = useState(`KORA-${Math.floor(100000 + Math.random() * 900000)}`);

  const subtotal = getCartTotal();
  const shipping = subtotal > 499 ? 0 : 49;
  const discount = Math.round(subtotal * 0.15);
  const total = subtotal + shipping - discount;

  // Redirect if cart is empty and not on success screen
  useEffect(() => {
    if (items.length === 0 && step !== 'SUCCESS') {
      router.push('/cart');
    }
  }, [items, step, router]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('SUCCESS');
      clearCart();
    }, 2000);
  };

  if (step === 'SUCCESS') {
    return (
      <div className="min-h-screen bg-[#F1F3F6] flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-12 max-w-lg w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </motion.div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Order Placed! 🎉</h1>
          <p className="text-gray-400 mb-8 font-medium">Your order <span className="text-gray-900 font-black">{orderNumber}</span> has been confirmed.</p>
           
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left space-y-3 border border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Delivery to:</span>
              <span className="text-gray-800 font-bold">{address.name || user?.name || 'You'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Payment:</span>
              <span className="text-gray-800 font-bold">{PAYMENT_METHODS.find(p => p.id === selectedPayment)?.label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Expected Delivery:</span>
              <span className="text-green-600 font-black">3–5 Business Days</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-bold">Total Paid:</span>
              <span className="text-gray-900 font-black text-base">${total.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/" className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm text-center">
              Back to Home
            </Link>
            <Link href="/profile" className="bg-[#6366F1] text-white px-6 py-3 rounded-xl font-black hover:bg-indigo-700 transition-all text-sm text-center shadow-lg">
              View Orders
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F3F6] pt-6 pb-24">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Step Indicator */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-widest overflow-x-auto">
          {[
            { label: 'Cart', num: 1, active: false, done: true },
            { label: 'Address', num: 2, active: step === 'ADDRESS', done: step === 'PAYMENT' },
            { label: 'Payment', num: 3, active: step === 'PAYMENT', done: false },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-3">
              {i > 0 && <div className="w-12 h-px bg-gray-200" />}
              <div className={`flex items-center gap-2 ${s.active ? 'text-indigo-600' : s.done ? 'text-green-600' : 'text-gray-300'}`}>
                <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[11px] font-black
                  ${s.active ? 'border-indigo-600 bg-indigo-600 text-white' : s.done ? 'border-green-500 bg-green-500 text-white' : 'border-gray-200'}`}
                >
                  {s.done ? '✓' : s.num}
                </span>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: Form */}
          <div className="lg:col-span-8 space-y-4">

            {/* Address Step */}
            <AnimatePresence mode="wait">
              {step === 'ADDRESS' && (
                <motion.div
                  key="address-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-4 bg-indigo-600 text-white font-black text-sm tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> DELIVERY ADDRESS
                  </div>
                  <div className="p-8 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                        <input
                          type="text"
                          value={address.name}
                          onChange={e => setAddress(a => ({ ...a, name: e.target.value }))}
                          className="w-full p-3.5 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none transition-all"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Phone Number</label>
                        <input
                          type="tel"
                          value={address.phone}
                          onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))}
                          className="w-full p-3.5 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none transition-all"
                          placeholder="10-digit number"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Pincode</label>
                        <input
                          type="text"
                          value={address.pincode}
                          onChange={e => setAddress(a => ({ ...a, pincode: e.target.value }))}
                          className="w-full p-3.5 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none transition-all"
                          placeholder="ZIP / Postal"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">City</label>
                        <input
                          type="text"
                          value={address.city}
                          onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
                          className="w-full p-3.5 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none transition-all"
                          placeholder="City"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">State</label>
                        <input
                          type="text"
                          value={address.state}
                          onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
                          className="w-full p-3.5 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none transition-all"
                          placeholder="State"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Address Line</label>
                      <textarea
                        value={address.addressLine}
                        onChange={e => setAddress(a => ({ ...a, addressLine: e.target.value }))}
                        className="w-full p-3.5 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none h-24 resize-none transition-all"
                        placeholder="House no., Street, Area..."
                      />
                    </div>
                    <button
                      onClick={() => setStep('PAYMENT')}
                      className="bg-[#FB641B] text-white px-10 py-4 rounded-xl font-black uppercase tracking-wider text-sm shadow-md hover:shadow-lg hover:bg-orange-600 transition-all active:scale-95"
                    >
                      Save & Continue to Payment →
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'PAYMENT' && (
                <motion.div
                  key="payment-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  {/* Address Summary */}
                  <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center border border-gray-100">
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Delivering to</p>
                      <p className="text-sm font-bold text-gray-800">{address.name || user?.name || 'You'} — {address.city || 'Your City'}, {address.pincode || '000000'}</p>
                    </div>
                    <button onClick={() => setStep('ADDRESS')} className="text-indigo-600 text-xs font-black uppercase tracking-widest border border-indigo-100 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all">
                      Change
                    </button>
                  </div>

                  {/* Payment Methods */}
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="p-4 bg-indigo-600 text-white font-black text-sm tracking-wider flex items-center gap-2">
                      <CreditCard className="w-4 h-4" /> PAYMENT OPTIONS
                    </div>
                    <div className="divide-y divide-gray-50">
                      {PAYMENT_METHODS.map((method) => (
                        <label key={method.id} className={`p-5 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedPayment === method.id ? 'bg-indigo-50/50' : ''}`}>
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={() => setSelectedPayment(method.id)}
                            className="accent-indigo-600 w-4 h-4"
                          />
                          <method.icon className={`w-5 h-5 ${selectedPayment === method.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                          <div>
                            <p className="text-sm font-black text-gray-800 tracking-tight">{method.label}</p>
                            <p className="text-[11px] text-gray-400 font-medium">{method.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* UPI Input */}
                    <AnimatePresence>
                      {selectedPayment === 'upi' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-5 overflow-hidden"
                        >
                          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Enter UPI ID</label>
                            <div className="flex gap-3">
                              <input
                                type="text"
                                value={upiId}
                                onChange={e => setUpiId(e.target.value)}
                                placeholder="yourname@upi"
                                className="flex-1 p-3 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none transition-all"
                              />
                              <button className="bg-indigo-600 text-white px-5 rounded-lg text-sm font-black hover:bg-indigo-700 transition-colors active:scale-95">Verify</button>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              {['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                                <span key={app} className="bg-white border border-gray-200 text-gray-600 text-[11px] font-bold px-3 py-1.5 rounded-lg">{app}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {selectedPayment === 'card' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-5 overflow-hidden"
                        >
                          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                            <input type="text" placeholder="Card Number" className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none transition-all" maxLength={19} />
                            <div className="grid grid-cols-2 gap-3">
                              <input type="text" placeholder="MM / YY" className="p-3 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none transition-all" />
                              <input type="text" placeholder="CVV" className="p-3 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none transition-all" maxLength={3} />
                            </div>
                            <input type="text" placeholder="Cardholder Name" className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 outline-none transition-all" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Place Order Button */}
                    <div className="p-5 border-t border-gray-100">
                      <form onSubmit={handlePlaceOrder}>
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="w-full bg-[#FB641B] text-white py-4 rounded-xl font-black uppercase tracking-wider text-sm shadow-lg hover:bg-orange-600 transition-all disabled:opacity-70 flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                          {isProcessing ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>🔒 Place Order — ${total.toLocaleString()}</>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm sticky top-24 border border-gray-100">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Order Summary</h2>
                <span className="text-[10px] font-black text-gray-500 bg-gray-50 px-2 py-1 rounded">{items.length} Items</span>
              </div>

              {/* Cart Items Preview */}
              <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="p-4 flex gap-3">
                    <div className="w-14 h-14 bg-gray-50 rounded-lg shrink-0 flex items-center justify-center border border-gray-50">
                      <img src={item.image} className="w-full h-full object-contain rounded-lg p-1" alt={item.title} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 line-clamp-1 leading-tight">{item.title}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Qty: {item.quantity} • {item.category}</p>
                    </div>
                    <p className="text-sm font-black text-gray-900 shrink-0">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="p-5 space-y-3 border-t border-gray-100">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-500">Discount (15%)</span>
                  <span className="text-[#388e3c] font-black">− ${discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-500">Shipping</span>
                  <span className={`font-black ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping}`}
                  </span>
                </div>
                <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-black text-gray-900">
                  <span className="text-base">Order Total</span>
                  <span className="text-xl">${total.toLocaleString()}</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-b-xl border-t border-green-100 text-center text-green-700 text-xs font-black uppercase tracking-wider">
                🏷️ You are saving ${discount.toLocaleString()}!
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-gray-400 text-[11px] font-bold px-2 uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 opacity-50 shrink-0" />
              <span>Safe & Secure Payments. Easy returns.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
