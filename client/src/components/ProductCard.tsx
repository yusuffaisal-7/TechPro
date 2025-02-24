import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
          <div className="mt-4 font-semibold">${product.price}</div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button className="w-full">Learn More</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
