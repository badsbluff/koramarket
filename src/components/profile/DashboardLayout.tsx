'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, ShoppingBag, MessageSquare, User, Settings, 
  Menu, X, LogOut, ChevronRight
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: ReactNode;
  activeItem?: string;
}

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, link: '/profile' },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, link: '/profile?view=orders' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, link: '/profile?view=messages' },
  { id: 'profile', label: 'Profile', icon: User, link: '/profile?view=profile' },
  { id: 'settings', label: 'Settings', icon: Settings, link: '/profile?view=settings' },
];

export function DashboardLayout({ children, activeItem = 'orders' }: DashboardLayoutProps) {
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-gray-100 sticky top-0 h-screen">
        <div className="p-10">
          <Link href="/" className="text-3xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">K</span>
            </div>
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">KORA</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="px-10 mb-12 flex flex-col items-center">
           <div className="w-20 h-20 rounded-full border-4 border-gray-50 overflow-hidden mb-4 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
           </div>
           <h3 className="text-lg font-black text-gray-900 tracking-tight">{user?.name}</h3>
           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Member Since 2014</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4">
           <div className="space-y-2">
              {MENU_ITEMS.map((item) => {
                const isActive = activeItem === item.id;
                return (
                  <Link 
                    key={item.id}
                    href={item.link}
                    className={`flex items-center gap-4 px-6 py-4 rounded-xl font-bold transition-all group relative ${
                      isActive ? 'text-rose-500 bg-rose-50/30' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-rose-500' : 'text-gray-400 group-hover:text-gray-700'}`} />
                    <span className="text-sm">{item.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-rose-500 rounded-r-full"
                      />
                    )}
                  </Link>
                );
              })}
           </div>
        </nav>

        {/* Footer Actions */}
        <div className="p-10 border-t border-gray-50">
           <button 
            onClick={logout}
            className="flex items-center gap-4 text-gray-400 font-bold hover:text-rose-500 transition-colors group"
           >
              <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <span className="text-sm">Logout</span>
           </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-50">
        <Link href="/" className="text-2xl font-black tracking-tighter">
          <span className="text-indigo-600">KORA</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="lg:hidden fixed inset-y-0 left-0 w-72 bg-white z-[70] p-6 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                 <span className="text-xl font-black text-indigo-600">MENU</span>
                 <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <nav className="flex-1 space-y-4">
                 {MENU_ITEMS.map((item) => (
                   <Link 
                    key={item.id}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 p-4 rounded-xl font-bold ${activeItem === item.id ? 'text-rose-500 bg-rose-50' : 'text-gray-500'}`}
                   >
                     <item.icon className="w-5 h-5" />
                     {item.label}
                   </Link>
                 ))}
              </nav>
              <button 
                onClick={logout}
                className="mt-6 flex items-center gap-4 p-4 text-rose-500 font-bold border-t border-gray-50 pt-10"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 pt-24 lg:pt-0 overflow-y-auto">
        <div className="p-6 md:p-12 w-full max-w-[1400px] mx-auto">
           {children}
        </div>
      </main>
    </div>
  );
}
