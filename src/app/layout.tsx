import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MiniCart } from "@/components/cart/MiniCart";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { AuthModal } from "@/components/auth/AuthModal";
import { SearchModal } from "@/components/search/SearchModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kora Market | Your High-Fidelity Tech Hub",
  description: "Experience the next generation of e-commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-[#F1F3F6] text-[#212121] relative z-0`}>
        <Navbar />
        <main className="flex-1 relative z-10 w-full min-h-screen">
          {children}
        </main>
        <Footer />
        <MiniCart />
        <AuthModal />
        <SearchModal />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
