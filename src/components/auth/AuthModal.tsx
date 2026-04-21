'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, user, login, logout } = useAuthStore();
  const [isLogin, setIsLogin] = useState(false); // Default to Sign Up
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      if (isLogin) {
        login(email, name || email.split('@')[0]);
      } else {
        // If they just signed up, switch to login view and show a dummy notification later
        setIsLogin(true);
        // keep email stored so it's pre-filled
        setPassword('');
      }
    }, 500);
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50"
            onClick={closeAuthModal}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white border border-black/5 shadow-2xl z-50 rounded-2xl overflow-hidden glass-panel"
          >
            <div className="flex justify-end p-4 absolute top-0 right-0 z-10">
              <button onClick={closeAuthModal} className="text-black/40 hover:text-black transition-colors p-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-10">
              {user ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6 text-black/50">
                    <UserIcon className="w-8 h-8" strokeWidth={1} />
                  </div>
                  <h2 className="text-2xl font-light text-black mb-2">Welcome, {user.name}</h2>
                  <p className="text-sm font-mono text-black/50 mb-8">{user.email}</p>
                  
                  <button 
                    onClick={logout}
                    className="w-full bg-black text-white py-4 text-xs font-medium uppercase tracking-[0.2em] rounded-xl hover:bg-black/80 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-serif italic text-black mb-8 text-center">{isLogin ? 'Sign In' : 'Create Account'}</h2>
                  
                  {!isLogin && (
                    <div className="mb-6">
                      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-black/60 mb-2">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#FAFAFA] border border-black/10 p-4 text-sm focus:border-black outline-none transition-all rounded-lg text-black" 
                      />
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-black/60 mb-2">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-black/10 p-4 text-sm focus:border-black outline-none transition-all rounded-lg text-black" 
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-black/60 mb-2">Password</label>
                    <input 
                      required 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-black/10 p-4 text-sm focus:border-black outline-none transition-all rounded-lg text-black" 
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black text-white py-4 text-xs font-medium uppercase tracking-[0.2em] rounded-xl hover:bg-[#222] transition-colors shadow-md"
                  >
                    {isLogin ? 'Sign In' : 'Sign Up'}
                  </button>

                  <div className="mt-6 text-center">
                    <button 
                      type="button" 
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-[10px] uppercase font-mono tracking-widest text-black/40 hover:text-black transition-colors border-b border-transparent hover:border-black pb-1"
                    >
                      {isLogin ? 'Create an Account' : 'Back to Sign In'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
