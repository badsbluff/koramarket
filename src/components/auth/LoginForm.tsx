'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(email, email.split('@')[0]);
      setIsLoading(false);
      router.push('/profile');
    }, 1000);
  };

  return (
    <div className="w-full">
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Sign in to Kora</h2>
        <p className="text-gray-400 font-medium tracking-tight">Enter your details to access your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[11px] font-black text-gray-700 uppercase tracking-widest mb-2 ml-1">
            Email or Phone Number
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 md:py-4 bg-gray-50/50 border border-gray-100 rounded-xl md:rounded-[20px] text-sm font-bold outline-none transition-all focus:bg-white focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] placeholder:text-gray-300"
              placeholder="Enter your email or phone number"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2 ml-1">
            <label className="block text-[11px] font-black text-gray-700 uppercase tracking-widest">
              Password
            </label>
            <Link href="#" className="text-[11px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-12 pr-12 py-3 md:py-4 bg-gray-50/50 border border-gray-100 rounded-xl md:rounded-[20px] text-sm font-bold outline-none transition-all focus:bg-white focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] placeholder:text-gray-300"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 md:py-4.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl md:rounded-[20px] font-black text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-all active:scale-[0.98] shadow-xl shadow-indigo-100 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Sign In <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="my-10 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Or continue with</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button className="py-3 border border-gray-100 rounded-xl md:rounded-[20px] flex items-center justify-center hover:bg-gray-50 transition-all font-black text-[13px] text-gray-700">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
        </button>
        <button className="py-3 border border-gray-100 rounded-xl md:rounded-[20px] flex items-center justify-center hover:bg-gray-50 transition-all font-black text-[13px] text-gray-700">
          <img src="https://www.svgrepo.com/show/303112/apple-black-logo.svg" className="w-5 h-5" alt="Apple" />
        </button>
        <button className="py-3 border border-gray-100 rounded-xl md:rounded-[20px] flex items-center justify-center hover:bg-gray-50 transition-all font-black text-[13px] text-gray-700">
          <img src="https://www.svgrepo.com/show/157818/facebook.svg" className="w-5 h-5" alt="Facebook" />
        </button>
      </div>

      <p className="mt-10 text-center text-sm font-bold text-gray-400">
        Don't have an account?{' '}
        <Link href="/signup" className="text-indigo-600 font-black hover:underline uppercase tracking-tight ml-1">
          Sign up
        </Link>
      </p>
    </div>
  );
}
