import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/ScrollAnimation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold">
              Future of Tech
              <span className="text-primary"> Innovation</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Discover cutting-edge technology products that transform the way you live and work.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/products">
                <Button size="lg">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
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
          </ScrollAnimation>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollAnimation key={feature.title} delay={index * 0.2}>
                <div className="p-6 rounded-lg bg-background">
                  <feature.icon className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Innovation",
    description: "Stay ahead with cutting-edge technology solutions",
    icon: ArrowRight,
  },
  // Add more features
];
