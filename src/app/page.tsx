'use client';

import { ProductCard } from '@/components/products/ProductCard';
import { 
  Truck, ShieldCheck, RefreshCw, Award,
  Gamepad2, Grid2X2, ChevronRight,
  Users, Gift, Zap, Shirt, Sparkles, Home as HomeIcon,
  Coffee, Trophy, ShoppingCart, Activity, Dog, Phone, Car
} from 'lucide-react';
import { ALL_PRODUCTS } from '@/store/useSearchStore';
import Link from 'next/link';
import { motion } from 'framer-motion';

const TRUST_ITEMS = [
  { icon: Truck,       title: 'Free Shipping',   desc: 'On orders over $49' },
  { icon: ShieldCheck, title: 'Secure Payments', desc: '100% secure payments' },
  { icon: RefreshCw,   title: 'Easy Returns',    desc: '30-day return policy' },
  { icon: Phone,       title: '24/7 Support',    desc: "We're here to help" },
  { icon: Award,       title: 'Best Prices',     desc: 'Guaranteed every day' },
];

const SHOP_BY_CATEGORY = [
  { name: 'Fashion',    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=180&auto=format&fit=crop' },
  { name: 'Electronics',img: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=180&auto=format&fit=crop' },
  { name: 'Home & Living',img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=180&auto=format&fit=crop' },
  { name: 'Beauty',     img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=180&auto=format&fit=crop' },
  { name: 'Appliances', img: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=180&auto=format&fit=crop' },
  { name: 'Sports',     img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=180&auto=format&fit=crop' },
  { name: 'Automotive', img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=180&auto=format&fit=crop' },
  { name: 'Groceries',  img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=180&auto=format&fit=crop' },
  { name: 'Health',     img: 'https://images.unsplash.com/photo-1505576399279-555b52d4ac71?q=80&w=180&auto=format&fit=crop' },
  { name: 'More', img: null, icon: Grid2X2 },
];

export default function Home() {
  return (
    <main className="bg-[#f4f5f7] min-h-screen pb-20">

      {/* ─────────────────────────────────────────────────────────
          HERO SECTION  — Cinematic, High-Contrast Minimalist
      ───────────────────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 pt-4 md:pt-6">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:min-h-[520px]">
          
          {/* Main Cinematic Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl md:rounded-3xl flex-1 overflow-hidden group bg-[#0A0A0A] flex items-center min-h-[400px] shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop" 
              alt="Hero" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-50 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            
            <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] rounded-full mb-6 border border-white/20"
              >
                Kora Premium Collection
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-6"
              >
                Elevate <br/>Your <span className="text-gray-400 italic font-serif font-medium tracking-normal">Style</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 text-[13px] md:text-[15px] font-medium max-w-sm mb-8 leading-relaxed"
              >
                Discover the new season's finest curated luxury fashion, electronics, and lifestyle essentials.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/apparel" className="bg-white text-black px-8 py-3.5 rounded-full font-black text-[12px] md:text-[13px] hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] inline-flex items-center gap-2 active:scale-95">
                  Shop The Collection <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Side Stack */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-[380px] shrink-0">
             {/* Tech Banner */}
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="relative rounded-2xl md:rounded-3xl flex-1 overflow-hidden bg-zinc-900 group min-h-[220px] shadow-lg"
             >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" alt="Tech" />
                <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-8">
                  <h3 className="text-white text-xl md:text-2xl font-black mb-2 tracking-tight">New Tech</h3>
                  <Link href="/apparel?category=Electronics" className="text-white/80 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] flex items-center gap-1 hover:text-white transition-colors w-fit">
                    Explore <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
             </motion.div>
             
             {/* Beauty Banner */}
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.3 }}
               className="relative rounded-2xl md:rounded-3xl flex-1 overflow-hidden bg-zinc-900 group min-h-[220px] shadow-lg"
             >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" alt="Beauty" />
                <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-8">
                  <h3 className="text-white text-xl md:text-2xl font-black mb-2 tracking-tight">Beauty & Care</h3>
                  <Link href="/apparel?category=Beauty" className="text-white/80 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] flex items-center gap-1 hover:text-white transition-colors w-fit">
                    Shop Now <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          TRUST BAR (Scroll on mobile)
      ───────────────────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 mt-6">
        <div className="bg-white rounded-2xl py-4 md:py-5 px-6 md:px-8 flex items-center justify-between gap-6 md:gap-4 border border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500" />
              </div>
              <div className="leading-tight">
                <p className="text-[11px] md:text-[12px] font-black text-gray-900">{item.title}</p>
                <p className="text-[9px] md:text-[10px] text-gray-400 font-medium">{item.desc}</p>
              </div>
              {i < TRUST_ITEMS.length - 1 && <div className="hidden xl:block w-px h-7 bg-gray-100 ml-4" />}
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          SHOP BY CATEGORY
      ───────────────────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 mt-8 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[18px] font-black text-gray-900">Shop by Category</h2>
          <Link href="/apparel" className="text-[#2874F0] font-black text-[13px] flex items-center gap-1 hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2 md:gap-3">
          {SHOP_BY_CATEGORY.map((cat, i) => (
            <Link key={i} href={cat.name === 'More' ? '/apparel' : `/apparel?category=${encodeURIComponent(cat.name)}`} className="group">
              <div className="bg-white rounded-xl md:rounded-2xl p-1.5 md:p-2 flex flex-col items-center gap-2 hover:shadow-md transition-all border border-gray-50">
                <div className="w-full aspect-square rounded-lg md:rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                  {cat.img ? (
                    <img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={cat.name} />
                  ) : (() => {
                    const Icon = cat.icon;
                    return Icon ? <Icon className="w-6 h-6 md:w-7 md:h-7 text-gray-400" /> : null;
                  })()}
                </div>
                <span className="text-[9px] md:text-[10px] font-black text-gray-700 text-center pb-0.5 md:pb-1 line-clamp-1 uppercase tracking-tighter">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          BEST SELLING PRODUCTS
      ───────────────────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 mt-2 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[18px] font-black text-gray-900">Best Selling Products</h2>
          <Link href="/apparel" className="text-[#2874F0] font-black text-[13px] flex items-center gap-1 hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4">
          {ALL_PRODUCTS.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          BOTTOM PROMO BANNERS — horizontal cards matching reference
      ───────────────────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-4 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="bg-[#EEF2FF] rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow group-hover:scale-110 transition-transform">
              <span className="text-2xl">👑</span>
            </div>
            <div className="flex-1">
              <h4 className="text-[14px] font-black text-gray-900 mb-0.5">Kora Plus</h4>
              <p className="text-[11px] text-gray-500 font-bold mb-2">Join & Get Extra Benefits</p>
              <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">Join Now</button>
            </div>
          </div>

          <div className="bg-[#FFF7ED] rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow group-hover:scale-110 transition-transform">
              <span className="text-2xl">💳</span>
            </div>
            <div className="flex-1">
              <h4 className="text-[14px] font-black text-gray-900 mb-0.5">Extra 5% Off</h4>
              <p className="text-[11px] text-gray-500 font-bold mb-2">On all prepaid orders</p>
              <button className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">Shop Now</button>
            </div>
          </div>

          <div className="bg-[#FFF0FD] rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow group-hover:scale-110 transition-transform">
              <span className="text-2xl">🎁</span>
            </div>
            <div className="flex-1">
              <h4 className="text-[14px] font-black text-gray-900 mb-0.5">Refer & Earn</h4>
              <p className="text-[11px] text-gray-500 font-bold mb-2">Invite friends & earn rewards</p>
              <button className="bg-pink-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">Invite Now</button>
            </div>
          </div>

          <div className="bg-[#F3F0FF] rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow group-hover:scale-110 transition-transform">
              <span className="text-2xl">💎</span>
            </div>
            <div className="flex-1">
              <h4 className="text-[14px] font-black text-gray-900 mb-0.5">Exclusive Member Deals</h4>
              <p className="text-[11px] text-gray-500 font-bold mb-2">Only for Kora Plus members</p>
              <button className="bg-purple-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">Explore</button>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
