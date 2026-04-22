'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function SignupForm() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setIsLoading(true);
    setTimeout(() => {
      login(email, name);
      setIsLoading(false);
      router.push('/profile');
    }, 1000);
  };

  return (
    <div className="w-full">
      <div className="mb-8 md:mb-10 text-center lg:text-left">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 md:mb-3 tracking-tight uppercase">Create Account</h2>
        <p className="text-[12px] md:text-sm text-gray-400 font-bold tracking-tight">Join the premium Kora marketplace</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-[11px] font-black text-gray-700 uppercase tracking-widest mb-2 ml-1">
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 md:py-4 bg-gray-50/50 border border-gray-100 rounded-xl md:rounded-[20px] text-sm font-bold outline-none transition-all focus:bg-white focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] placeholder:text-gray-300"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-black text-gray-700 uppercase tracking-widest mb-2 ml-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 md:py-4 bg-gray-50/50 border border-gray-100 rounded-xl md:rounded-[20px] text-sm font-bold outline-none transition-all focus:bg-white focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] placeholder:text-gray-300"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-black text-gray-700 uppercase tracking-widest mb-2 ml-1">
            Phone Number
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 md:py-4 bg-gray-50/50 border border-gray-100 rounded-xl md:rounded-[20px] text-sm font-bold outline-none transition-all focus:bg-white focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] placeholder:text-gray-300"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-black text-gray-700 uppercase tracking-widest mb-2 ml-1">
              Password
            </label>
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
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-black text-gray-700 uppercase tracking-widest mb-2 ml-1">
              Confirm
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-12 pr-12 py-3 md:py-4 bg-gray-50/50 border border-gray-100 rounded-xl md:rounded-[20px] text-sm font-bold outline-none transition-all focus:bg-white focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] placeholder:text-gray-300"
                placeholder="Confirm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 py-3 ml-1">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="terms" className="text-[11px] font-bold text-gray-500 leading-normal cursor-pointer text-balance">
            I agree to the <Link href="#" className="text-indigo-600 hover:underline">Terms of Service</Link> and <Link href="#" className="text-indigo-600 hover:underline">Privacy Policy</Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading || !agreed}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl md:rounded-[20px] font-black text-[12px] md:text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-all active:scale-[0.98] shadow-xl shadow-indigo-100 disabled:opacity-50 uppercase tracking-widest"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Create Account <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="my-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Or sign up with</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button className="py-3 px-4 border border-gray-100 rounded-xl md:rounded-[20px] flex items-center justify-center hover:bg-gray-50 transition-all gap-3 sm:gap-0">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
          <span className="sm:hidden text-[11px] font-black text-gray-700 uppercase tracking-wider">Sign up with Google</span>
          <span className="hidden sm:inline ml-2 text-[10px] font-black text-gray-700 uppercase tracking-wider">Google</span>
        </button>
        <button className="py-3 px-4 border border-gray-100 rounded-xl md:rounded-[20px] flex items-center justify-center hover:bg-gray-50 transition-all gap-3 sm:gap-0">
          <img src="https://www.svgrepo.com/show/303112/apple-black-logo.svg" className="w-5 h-5" alt="Apple" />
          <span className="sm:hidden text-[11px] font-black text-gray-700 uppercase tracking-wider">Sign up with Apple</span>
          <span className="hidden sm:inline ml-2 text-[10px] font-black text-gray-700 uppercase tracking-wider">Apple</span>
        </button>
        <button className="py-3 px-4 border border-gray-100 rounded-xl md:rounded-[20px] flex items-center justify-center hover:bg-gray-50 transition-all gap-3 sm:gap-0">
          <img src="https://www.svgrepo.com/show/157818/facebook.svg" className="w-5 h-5" alt="Facebook" />
          <span className="sm:hidden text-[11px] font-black text-gray-700 uppercase tracking-wider">Sign up with Facebook</span>
          <span className="hidden sm:inline ml-2 text-[10px] font-black text-gray-700 uppercase tracking-wider">Facebook</span>
        </button>
      </div>

      <p className="mt-8 text-center text-sm font-bold text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-600 font-black hover:underline uppercase tracking-tight ml-1">
          Sign In
        </Link>
      </p>
    </div>
  );
}
