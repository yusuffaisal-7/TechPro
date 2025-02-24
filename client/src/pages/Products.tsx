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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold">Our Products</h1>
          <div className="w-full sm:w-72">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input className="pl-10 w-full" placeholder="Search products..." />
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}