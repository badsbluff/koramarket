import { create } from 'zustand';

export interface UserAddress {
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  city: string;
  zip: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  address?: UserAddress;
}

interface AuthState {
  user: User | null;
  isAuthModalOpen: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateAddress: (address: UserAddress) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthModalOpen: false,
  
  login: (email, name = 'User') => 
    set({ 
      user: { 
        id: Math.random().toString(36).substring(7), 
        email, 
        name 
      },
      isAuthModalOpen: false // Close modal immediately on login
    }),
    
  logout: () => set({ user: null }),
  
  updateAddress: (address) => 
    set((state) => ({
      user: state.user ? { ...state.user, address } : null
    })),
    
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
}));
