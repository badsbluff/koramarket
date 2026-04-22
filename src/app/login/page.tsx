'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import { ShieldCheck, Tag, ShoppingBag, Headphones } from 'lucide-react';

const LOGIN_FEATURES = [
  { 
    icon: ShieldCheck, 
    title: 'Secure & Safe', 
    desc: 'Your data is always protected' 
  },
  { 
    icon: Tag, 
    title: 'Exclusive Deals', 
    desc: 'Get access to member only offers' 
  },
  { 
    icon: Headphones, 
    title: '24/7 Support', 
    desc: 'We are here to help you anytime' 
  },
];

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back!&#10;Good to see you&#10;again 👋"
      subtitle="Sign in to continue shopping your favorite products."
      activeImage="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop"
      features={LOGIN_FEATURES}
    >
      <LoginForm />
    </AuthLayout>
  );
}
