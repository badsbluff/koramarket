'use client';

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after scrolling down 300px
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://wa.me/1234567890?text=Hi%2C%20I%20would%20like%20to%20chat%20with%20a%20styling%20expert!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-in fade-in slide-in-from-bottom"
      aria-label="Chat with expert on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      {/* Optional: Add a small badge or tooltip if requested */}
    </a>
  );
}
