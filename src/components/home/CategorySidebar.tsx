'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const DEPARTMENTS = [
  { name: 'Value of the Day', highlighted: true },
  { name: 'Top 100 Offers', highlighted: true },
  { name: 'New Arrivals', highlighted: true },
  { name: 'Computers & Laptops', hasChildren: true },
  { name: 'Cameras & Photo', hasChildren: true },
  { name: 'Smart Phones & Tablets', hasChildren: true },
  { name: 'Video Games & Consoles', hasChildren: true },
  { name: 'TV & Audio', hasChildren: true },
  { name: 'Car Electronic & GPS', hasChildren: true },
  { name: 'Accessories', hasChildren: true },
  { name: 'Gadgets', hasChildren: false },
  { name: 'Virtual Reality', hasChildren: false },
];

export function CategorySidebar() {
  return (
    <aside className="w-72 bg-white border border-gray-100 rounded-b-lg hidden lg:block overflow-hidden shadow-sm">
      <div className="flex flex-col">
        {DEPARTMENTS.map((dept, i) => (
          <Link
            key={dept.name}
            href={`/apparel?category=${encodeURIComponent(dept.name)}`}
            className={`px-6 py-3.5 flex items-center justify-between text-[13px] transition-colors border-b border-gray-50 last:border-0 ${
              dept.highlighted ? 'font-bold text-[#212121]' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {dept.name}
            {dept.hasChildren && <ChevronRight className="w-3.5 h-3.5 opacity-20" />}
          </Link>
        ))}
      </div>
    </aside>
  );
}
