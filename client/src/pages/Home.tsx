import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/ScrollAnimation";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Clock, Heart } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products?.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-primary/5 rounded-full"
              style={{
                width: `${300 + i * 200}px`,
                height: `${300 + i * 200}px`,
                top: `${50 + i * 20}%`,
                left: `${20 + i * 20}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.2, 0.3],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6 inline-block"
            >
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                Welcome to TechPro
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold">
              Future of Tech
              <span className="text-primary"> Innovation</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Discover cutting-edge technology products that transform the way you live and work.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/products">
                <Button size="lg" className="group">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">Learn More</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-center">Why Choose Us</h2>
            <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
              We provide the best tech products with unmatched quality and service
            </p>
          </ScrollAnimation>

          <div className="mt-16 grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <ScrollAnimation key={feature.title} delay={index * 0.2}>
                <div className="p-6 rounded-lg bg-background group hover:bg-primary/5 transition-colors">
                  <feature.icon className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-center">Featured Products</h2>
            <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
              Check out our most popular tech products
            </p>
          </ScrollAnimation>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {featuredProducts?.map((product, index) => (
              <ScrollAnimation key={product.id} delay={index * 0.2}>
                <ProductCard product={product} />
              </ScrollAnimation>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold">Ready to Transform Your Tech Experience?</h2>
              <p className="mt-4 text-primary-foreground/80">
                Join thousands of satisfied customers who trust TechPro for their technology needs
              </p>
              <Link href="/products">
                <Button size="lg" variant="secondary" className="mt-8">
                  Start Shopping Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Quality Products",
    description: "Only the best tech products make it to our store",
    icon: ShieldCheck,
  },
  {
    title: "Fast Delivery",
    description: "Quick and reliable shipping to your doorstep",
    icon: Zap,
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer service for you",
    icon: Clock,
  },
  {
    title: "Satisfaction Guaranteed",
    description: "Love your purchase or get your money back",
    icon: Heart,
  },
];