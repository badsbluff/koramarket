import Link from "next/link";
import { Package, ShoppingCart, Users, Tag } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 admin-layout p-0 m-0">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col pt-20">
        <div className="px-6 pb-6 border-b border-gray-100">
          <h2 className="text-lg font-bold tracking-widest text-[var(--color-brand)] uppercase">Kora Admin</h2>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            <li>
              <Link href="/admin" className="flex items-center px-6 py-3 text-sm font-medium text-gray-900 bg-gray-100">
                <Package className="w-5 h-5 mr-3 text-gray-500" /> Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/products" className="flex items-center px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <Tag className="w-5 h-5 mr-3 text-gray-400" /> Products
              </Link>
            </li>
            <li>
              <Link href="/admin/orders" className="flex items-center px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <ShoppingCart className="w-5 h-5 mr-3 text-gray-400" /> Orders
              </Link>
            </li>
            <li>
              <Link href="/admin/customers" className="flex items-center px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <Users className="w-5 h-5 mr-3 text-gray-400" /> Customers
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 pt-24">
        {children}
      </main>
      
      {/* Remove global padding for admin routes to sit flush */}
      <style dangerouslySetInnerHTML={{__html: `
        body { padding-top: 0 !important; }
        header { display: none !important; }
        footer { display: none !important; }
      `}} />
    </div>
  );
}
