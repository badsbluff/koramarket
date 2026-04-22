'use client';

import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { 
  ShoppingBag, CheckCircle2, ChevronDown, 
  ChevronUp, Bell, User, Clock, Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '@/components/profile/DashboardLayout';
import { useState } from 'react';

const TRACKING_STEPS = [
  { id: 'placed', label: 'Order Placed', desc: 'Received successfully' },
  { id: 'processed', label: 'Processed', desc: 'Ready for shipping' },
  { id: 'shipped', label: 'Shipped', desc: 'Left our warehouse' },
  { id: 'transit', label: 'In Transit', desc: 'Moving to your city' },
  { id: 'delivery', label: 'Out for Delivery', desc: 'With local courier' },
  { id: 'completed', label: 'Delivered', desc: 'Successfully received' },
];

const DUMMY_ORDERS = [
  {
    orderId: 'Order 1',
    agent: 'KORA Prime Shipping',
    task: 'International Courier',
    progress: 45,
    expectedDate: 'Oct 12, 2023',
    daysLeft: 15,
    activeStep: 2, // Shipped
  },
  {
    orderId: 'Order 2',
    agent: 'Local Express',
    task: 'Last-mile delivery',
    progress: 75,
    expectedDate: 'Oct 12, 2023',
    daysLeft: 15,
    activeStep: 4, // Out for Delivery
  }
];

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [expandedOrders, setExpandedOrders] = useState<string[]>(['Order 1']);

  const toggleOrder = (id: string) => {
    setExpandedOrders(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
           <h2 className="text-2xl font-black text-gray-900 mb-4">You are logged out</h2>
           <Link href="/login" className="text-indigo-600 font-bold hover:underline">Back to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout activeItem="orders">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">My Orders</h1>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manage your active transactions</p>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                 <Bell className="w-5 h-5" />
              </div>
              <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:shadow-xl transition-all">
                 Create Order
              </button>
           </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {DUMMY_ORDERS.map((order) => {
            const isExpanded = expandedOrders.includes(order.orderId);
            return (
              <div key={order.orderId} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                {/* Order Summary Header */}
                <div className="p-8 md:p-10 flex flex-wrap gap-12 items-center justify-between">
                   <div className="space-y-1">
                      <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{order.orderId}</h3>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Agent: {order.agent}</p>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Task: {order.task}</p>
                   </div>
                   
                   <div className="flex-1 min-w-[200px] max-w-[300px]">
                      <div className="flex justify-between items-center mb-3">
                         <span className="text-[13px] font-black text-gray-900 uppercase">Complete</span>
                         <span className="text-2xl font-black text-gray-900">{order.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                         <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${order.progress}%` }}
                          className="h-full bg-rose-500 rounded-full"
                         />
                      </div>
                   </div>

                   <div className="text-right">
                      <p className="text-[13px] font-black text-gray-900 uppercase tracking-wide">Expected Completion</p>
                      <p className="text-lg font-black text-gray-900 mt-1">{order.expectedDate}</p>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">{order.daysLeft} Days</p>
                   </div>
                </div>

                {/* Milestone Tracker - Horizontal */}
                <div className="px-8 md:px-10 pb-10">
                   <div className="relative mt-8 mb-12 h-1 bg-gray-100 rounded-full mx-6">
                      <div className="absolute top-0 left-0 bottom-0 bg-rose-500 rounded-full transition-all duration-1000" style={{ width: `${(order.activeStep / (TRACKING_STEPS.length - 1)) * 100}%` }} />
                      
                      <div className="absolute inset-0 flex justify-between items-center -translate-y-1/2">
                         {TRACKING_STEPS.map((step, idx) => {
                           const isDone = idx <= order.activeStep;
                           const isCurrent = idx === order.activeStep;
                           return (
                             <div key={step.id} className="relative flex flex-col items-center">
                                <div className={`w-5 h-5 rounded-full border-4 border-white shadow-sm z-10 transition-colors duration-500 ${isDone ? 'bg-rose-500' : 'bg-gray-200'}`} />
                                <div className="absolute top-8 text-center w-24">
                                   <p className={`text-[9px] font-black uppercase tracking-tighter ${isDone ? 'text-gray-900' : 'text-gray-300'}`}>{step.label}</p>
                                </div>
                             </div>
                           );
                         })}
                      </div>
                   </div>
                </div>

                {/* Recommendations Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-50 overflow-hidden"
                    >
                      <div className="p-8 md:p-10 space-y-4">
                         <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Recommendations</h4>
                         
                         <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-orange-50/50 rounded-2xl border border-orange-100 gap-6 transition-all hover:bg-orange-50">
                            <div className="flex items-center gap-4">
                               <div className="w-2 h-2 rounded-full bg-gray-900" />
                               <p className="text-sm font-bold text-gray-800 leading-snug">
                                 Your shipment has entered the transit zone. Would you like to enable premium last-mile insurance?
                               </p>
                            </div>
                            <div className="flex gap-2">
                               <button className="bg-white border border-gray-200 px-6 py-2 rounded-lg font-black text-xs hover:bg-gray-50 transition-all uppercase tracking-widest shadow-sm">No</button>
                               <button className="bg-white border border-gray-200 px-6 py-2 rounded-lg font-black text-xs hover:bg-gray-50 transition-all uppercase tracking-widest shadow-sm">Yes</button>
                            </div>
                         </div>

                         <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-rose-50/50 rounded-2xl border border-rose-100 gap-6 transition-all hover:bg-rose-50">
                            <div className="flex items-center gap-4">
                               <div className="w-2 h-2 rounded-full bg-gray-900" />
                               <p className="text-sm font-bold text-gray-800 leading-snug">
                                 The local courier is experiencing higher than usual volume. Recommend paying soon for express slot.
                               </p>
                            </div>
                            <div className="flex gap-2">
                               <button className="bg-white border border-gray-200 px-6 py-2 rounded-lg font-black text-xs hover:bg-gray-50 transition-all uppercase tracking-widest shadow-sm">No</button>
                               <button className="bg-white border border-gray-200 px-6 py-2 rounded-lg font-black text-xs hover:bg-gray-50 transition-all uppercase tracking-widest shadow-sm">Yes</button>
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer Expand Button */}
                <button 
                  onClick={() => toggleOrder(order.orderId)}
                  className="w-full py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {isExpanded ? (
                    <>Minimize <ChevronUp className="w-3 h-3" /></>
                  ) : (
                    <>Expand <ChevronDown className="w-3 h-3" /></>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
