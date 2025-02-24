import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import type { Product } from "@shared/schema";

export default function Products() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold">Our Products</h1>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  className="bg-muted rounded-lg overflow-hidden"
                >
                  <div className="aspect-square animate-pulse bg-muted-foreground/10" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 w-3/4 animate-pulse bg-muted-foreground/10 rounded" />
                    <div className="h-4 w-1/2 animate-pulse bg-muted-foreground/10 rounded" />
                  </div>
                </motion.div>
              ))
            : products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </div>
  );
}