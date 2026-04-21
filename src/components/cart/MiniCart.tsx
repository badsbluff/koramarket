'use client';

import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';

export function MiniCart() {
  const { isCartOpen, closeCart, items, removeItem, updateQuantity, getCartTotal } = useCartStore();

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeCart}
      />
      
      <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white border-l border-black/5 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-black/5">
          <h2 className="text-lg font-semibold uppercase tracking-widest text-[var(--color-brand)]">Your Cart</h2>
          <button 
            onClick={closeCart}
            className="p-2 text-black/40 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-black/10" strokeWidth={1} />
              <p className="text-black/50 uppercase tracking-wider text-sm">Your cart is empty</p>
              <button 
                onClick={closeCart}
                className="mt-4 px-6 py-3 glass-panel bg-black/5 text-black text-sm font-medium uppercase tracking-wider hover:bg-black/10 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex space-x-4">
                  <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-black/5 rounded-sm">
                    {/* Placeholder for real images */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-black/90">
                        <h3 className="line-clamp-1"><a href="#">{item.title}</a></h3>
                        <p className="ml-4 tracking-widest font-mono">₹{item.price}</p>
                      </div>
                      {item.size && (
                        <p className="mt-1 text-xs text-black/50 uppercase tracking-widest">Size {item.size}</p>
                      )}
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-black/10 rounded-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-black/50 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 py-1 text-black">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-black/50 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="font-medium text-gray-400 hover:text-red-500 text-xs uppercase tracking-wider"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-black/5 p-6 bg-black/[0.02]">
            <div className="flex justify-between text-base font-medium text-black mb-4">
              <p className="uppercase tracking-wider">Subtotal</p>
              <p className="tracking-widest font-mono">₹{getCartTotal()}</p>
            </div>
            <p className="mt-0.5 text-xs text-black/40 mb-6 font-light uppercase tracking-widest">Shipping and taxes calculated at checkout.</p>
            
            <Link 
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center w-full bg-black text-white px-6 py-4 text-xs font-medium uppercase tracking-[0.3em] hover:bg-[#111] transition-colors rounded-xl"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
