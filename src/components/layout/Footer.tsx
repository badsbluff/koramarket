'use client';

import { Globe, HelpCircle, Mail, Phone, Info, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#212121] text-white pt-12 pb-8 text-[12px]">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-gray-700">
          
          <div className="space-y-3">
             <h4 className="text-gray-500 font-bold uppercase tracking-wider mb-4">ABOUT</h4>
             <ul className="space-y-2 font-medium">
                <li><Link href="#" className="hover:underline">Contact Us</Link></li>
                <li><Link href="#" className="hover:underline">About Us</Link></li>
                <li><Link href="#" className="hover:underline">Careers</Link></li>
                <li><Link href="#" className="hover:underline">Stories</Link></li>
                <li><Link href="#" className="hover:underline">Press</Link></li>
             </ul>
          </div>

          <div className="space-y-3">
             <h4 className="text-gray-500 font-bold uppercase tracking-wider mb-4">HELP</h4>
             <ul className="space-y-2 font-medium">
                <li><Link href="#" className="hover:underline">Payments</Link></li>
                <li><Link href="#" className="hover:underline">Shipping</Link></li>
                <li><Link href="#" className="hover:underline">Cancellation</Link></li>
                <li><Link href="#" className="hover:underline">Returns</Link></li>
                <li><Link href="#" className="hover:underline">FAQ</Link></li>
             </ul>
          </div>

          <div className="space-y-3">
             <h4 className="text-gray-500 font-bold uppercase tracking-wider mb-4">POLICY</h4>
             <ul className="space-y-2 font-medium">
                <li><Link href="#" className="hover:underline">Return Policy</Link></li>
                <li><Link href="#" className="hover:underline">Terms Of Use</Link></li>
                <li><Link href="#" className="hover:underline">Security</Link></li>
                <li><Link href="#" className="hover:underline">Privacy</Link></li>
                <li><Link href="#" className="hover:underline">Sitemap</Link></li>
             </ul>
          </div>

          <div className="space-y-3">
             <h4 className="text-gray-500 font-bold uppercase tracking-wider mb-4">SOCIAL</h4>
             <ul className="space-y-2 font-medium">
                <li><Link href="#" className="hover:underline">Facebook</Link></li>
                <li><Link href="#" className="hover:underline">Twitter</Link></li>
                <li><Link href="#" className="hover:underline">YouTube</Link></li>
             </ul>
          </div>

          {/* Mail & Address (Flipkart style takes more space) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 flex flex-col md:flex-row gap-8 lg:gap-12 pl-0 lg:pl-12 lg:border-l border-gray-700 text-center md:text-left">
             <div className="space-y-3">
                <h4 className="text-gray-500 font-bold uppercase tracking-wider mb-4">Mail Us:</h4>
                <p className="text-gray-300 leading-normal">
                   Kora Market Internet Private Limited,<br/>
                   Buildings Alyssa, Begonia &<br/>
                   Clove Embassy Tech Village,<br/>
                   Outer Ring Road, Devarabeesanahalli Village,<br/>
                   Bengaluru, 560103,<br/>
                   Karnataka, India
                </p>
             </div>
             <div className="space-y-3">
                <h4 className="text-gray-500 font-bold uppercase tracking-wider mb-4">Registered Office:</h4>
                <p className="text-gray-300 leading-normal">
                   Kora Market Internet Private Limited,<br/>
                   Buildings Alyssa, Begonia &<br/>
                   Clove Embassy Tech Village,<br/>
                   Outer Ring Road, Devarabeesanahalli Village,<br/>
                   Bengaluru, 560103,<br/>
                   Karnataka, India<br/>
                   CIN : U51109KA2012PTC066107<br/>
                   Telephone: <span className="text-[#2874f0]">044-45614700</span>
                </p>
             </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-8 text-center lg:text-left">
           <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-8 gap-y-4 text-gray-300 font-medium">
              <Link href="#" className="flex items-center gap-2 hover:text-[#2874f0] transition-colors">
                 <ShoppingBag className="w-4 h-4 text-orange-500" /> Become a Kora Seller
              </Link>
              <Link href="#" className="flex items-center gap-2 hover:text-[#2874f0] transition-colors">
                 <Award className="w-4 h-4 text-orange-500" /> Advertise
              </Link>
              <Link href="#" className="flex items-center gap-2 hover:text-[#2874f0] transition-colors">
                 <HelpCircle className="w-4 h-4 text-orange-500" /> Help Center
              </Link>
              <span className="w-full lg:w-auto mt-2 lg:mt-0">&copy; {new Date().getFullYear()} KORA MARKETPLACE. All Rights Reserved.</span>
           </div>
           
           <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg" className="h-4 opacity-80" alt="Payment Methods" />
        </div>

      </div>
    </footer>
  );
}

function Award({ className }: { className?: string }) {
  return <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>;
}
function ShoppingBag({ className }: { className?: string }) {
  return <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>;
}
