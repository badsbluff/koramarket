import { Hero } from "@/components/home/Hero";
import { NewArrivals } from "@/components/home/NewArrivals";
import { ProductGrid } from "@/components/home/ProductGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <ProductGrid />
    </>
  );
}
