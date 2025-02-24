import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
    >
      <Card className="overflow-hidden group">
        <div className="aspect-square overflow-hidden relative">
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 
            transition-opacity duration-300" />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 transition-transform duration-300 ${
              isWishlisted ? "text-primary" : "text-white"
            }`}
            onClick={handleToggleWishlist}
          >
            <Heart
              className={`h-5 w-5 ${isWishlisted ? "fill-primary" : ""}`}
            />
          </Button>
        </div>
        <CardContent className="p-6">
          <motion.h3 
            className="text-lg font-semibold group-hover:text-primary transition-colors duration-300"
          >
            {product.name}
          </motion.h3>
          <motion.p 
            className="mt-2 text-sm text-muted-foreground group-hover:text-muted-foreground/80 
              transition-colors duration-300"
          >
            {product.description}
          </motion.p>
          <motion.div 
            className="mt-4 font-semibold group-hover:text-primary transition-colors duration-300"
          >
            ${product.price}
          </motion.div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button 
            className="w-full group-hover:bg-primary/90 transition-colors duration-300" 
            onClick={handleAddToCart}
          >
            <motion.span
              className="flex items-center"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </motion.span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}