import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Product } from "@shared/schema";
import Footer from "@/components/Footer";

export default function Products() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Our Products</h1>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input className="pl-10" placeholder="Search products..." />
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="bg-muted rounded-lg overflow-hidden"
                >
                  <div className="aspect-square animate-pulse bg-muted-foreground/10" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 w-3/4 animate-pulse bg-muted-foreground/10 rounded" />
                    <div className="h-4 w-1/2 animate-pulse bg-muted-foreground/10 rounded" />
                  </div>
                </motion.div>
              ))
            : products?.slice(0, 50).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}