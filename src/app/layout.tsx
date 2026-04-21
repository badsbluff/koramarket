import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MiniCart } from "@/components/cart/MiniCart";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { AuthModal } from "@/components/auth/AuthModal";
import { SearchModal } from "@/components/search/SearchModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kora | Premium Korean Fashion & Jewelry",
  description: "Modern Seoul Minimalist aesthetic e-commerce store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col pt-16 bg-background text-foreground relative z-0">
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="aurora-glow top-[10%] left-[20%]"></div>
          <div className="aurora-glow-secondary bottom-[20%] right-[10%]"></div>
        </div>
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <MiniCart />
        <AuthModal />
        <SearchModal />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
