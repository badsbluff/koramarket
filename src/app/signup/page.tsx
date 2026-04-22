'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';
import { ShieldCheck, ShoppingBag, Heart, Truck } from 'lucide-react';

const SIGNUP_FEATURES = [
  { 
    icon: ShoppingBag, 
    title: 'Exclusive Offers', 
    desc: 'Get access to member only deals' 
  },
  { 
    icon: ShieldCheck, 
    title: 'Secure Shopping', 
    desc: '100% secure payments and data protection' 
  },
  { 
    icon: Heart, 
    title: 'Wishlist & Save', 
    desc: 'Save your favorite items and shop later' 
  },
  { 
    icon: Truck, 
    title: 'Fast Delivery', 
    desc: 'Quick and reliable delivery at your door' 
  },
];

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your&#10;Kora account&#10;It's quick & easy!"
      subtitle="Join millions of happy shoppers and enjoy exclusive benefits."
      activeImage="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
      features={SIGNUP_FEATURES}
    >
      <SignupForm />
    </AuthLayout>
  );
}
