'use client';

import Link from 'next/link';
import { Search, ShoppingBag, Menu, User } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useSearchStore } from '@/store/useSearchStore';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const { toggleCart, getCartItemsCount } = useCartStore();
  const { openAuthModal, user } = useAuthStore();
  const { openSearch } = useSearchStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  const cartItemsCount = getCartItemsCount();
  const isHome = pathname === '/';

  // Handle Scroll to alter navigation state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Apparel', href: '/apparel' },
    { name: 'Jewelry', href: '/jewelry' },
    { name: 'Accessories', href: '/accessories' }
  ];

  const textColor = 'text-black/70 hover:text-black';
  const logoColor = 'text-black';

  return (
    <>
      <motion.header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          isScrolled 
            ? "py-4" 
            : "py-6"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={cn(
          "mx-auto max-w-7xl px-6 md:px-8 transition-all duration-500 ease-in-out flex items-center justify-between",
          isScrolled 
            ? "glass-panel rounded-full py-3" 
            : "bg-transparent rounded-none border-none py-0"
        )}>
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn("p-2 -ml-2", textColor)}
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
            <Link href="/" className={cn("text-xl md:text-2xl font-bold tracking-[0.2em] uppercase", logoColor)}>
              Kora
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={cn(
                  "relative px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors group",
                  textColor
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px transition-all duration-300 ease-out group-hover:w-1/2 bg-black"
                )}></span>
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={openSearch}
              className={cn("p-2 hidden md:block hover:opacity-70 transition-opacity", textColor)}
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>
            <button 
              onClick={openAuthModal}
              className={cn("p-2 hidden sm:block hover:opacity-70 transition-opacity relative", textColor)}
            >
              <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
              {user && (
                 <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
              )}
            </button>
            <button 
              onClick={toggleCart}
              className={cn("p-2 hover:opacity-70 transition-opacity relative", textColor)}
            >
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
              <AnimatePresence>
                {cartItemsCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-0 bg-[#D4AF37] text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center shadow-md"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-white/95 md:hidden pt-24 px-6 flex flex-col"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-black"
            >
              <span className="text-xs uppercase tracking-widest">Close</span>
            </button>
            
            <div className="flex flex-col space-y-6 mt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-light text-black uppercase tracking-widest inline-block hover:text-black/70 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto mb-12"
            >
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search collections..." 
                  className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-black/10 text-sm text-black focus:border-black outline-none transition-colors"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
