export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Overview</h1>
        <div className="text-sm text-gray-500">Last updated: Just now</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Revenue</h3>
          <p className="text-3xl font-light text-gray-900">₹1,24,500</p>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            12.5% from last month
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Orders</h3>
          <p className="text-3xl font-light text-gray-900">142</p>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            8.1% from last month
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Products</h3>
          <p className="text-3xl font-light text-gray-900">48</p>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            2 new this week
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-[var(--color-brand)]">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-xs border-b border-gray-200">
              <tr>
                <th className="py-3 px-6 font-medium">Order ID</th>
                <th className="py-3 px-6 font-medium">Customer</th>
                <th className="py-3 px-6 font-medium">Status</th>
                <th className="py-3 px-6 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">#KORA-84920</td>
                <td className="py-4 px-6">Priya Sharma</td>
                <td className="py-4 px-6"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Paid</span></td>
                <td className="py-4 px-6 text-right">₹11,498</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">#KORA-84919</td>
                <td className="py-4 px-6">Aman Verma</td>
                <td className="py-4 px-6"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span></td>
                <td className="py-4 px-6 text-right">₹4,499</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">#KORA-84918</td>
                <td className="py-4 px-6">Neha Gupta</td>
                <td className="py-4 px-6"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Paid</span></td>
                <td className="py-4 px-6 text-right">₹2,499</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
