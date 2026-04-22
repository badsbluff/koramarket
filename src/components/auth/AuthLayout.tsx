'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
  activeImage: string;
  title: string;
  subtitle: string;
  features: { icon: any; title: string; desc: string }[];
}

export function AuthLayout({ children, activeImage, title, subtitle, features }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-stretch bg-white">
      {/* Left Column - Visuals & Branding */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-[#F8F9FF] to-[#FFF8F8] p-16 flex-col">
        <div className="relative z-10 h-full flex flex-col">
          {/* Logo */}
          <Link href="/" className="text-3xl font-black tracking-tighter mb-16 block">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">KORA</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight whitespace-pre-line">
              {title}
            </h1>
            <p className="text-gray-400 text-lg font-medium max-w-sm leading-relaxed">
              {subtitle}
            </p>
          </motion.div>

          {/* Benefits/Features List */}
          <div className="space-y-6 mb-12">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-50 flex items-center justify-center text-purple-600 shrink-0">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-400 font-medium">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lifestyle Collage Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-auto relative w-full h-[40%] flex items-end justify-center"
          >
            <div className="relative w-full h-full">
              <img 
                src={activeImage} 
                alt="Product Visual" 
                className="w-full h-full object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Trust Footer */}
          <div className="mt-12 flex items-center gap-8 pt-8 border-t border-gray-100">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="leading-none">
                  <p className="text-[11px] font-black text-gray-900 uppercase">Secure & Safe</p>
                  <p className="text-[10px] text-gray-400 font-bold">Encrypted data</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="leading-none">
                  <p className="text-[11px] font-black text-gray-900 uppercase">24/7 Support</p>
                  <p className="text-[10px] text-gray-400 font-bold">Fast assistance</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-20 relative overflow-y-auto bg-white">
        <div className="w-full max-w-[440px]">
           {/* Children (Form) */}
          {children}

          {/* Footer Branding Area */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center gap-4">
             <div className="flex items-center gap-2 opacity-40">
                <ShieldCheckIcon className="w-4 h-4" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Protected by reCAPTCHA</span>
             </div>
             <div className="flex gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
                <span>•</span>
                <Link href="#" className="hover:text-gray-900">Terms of Service</Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheckIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
