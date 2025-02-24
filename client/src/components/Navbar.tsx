import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShoppingCart, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Logo from "./Logo";
import { useCart } from "@/lib/cart";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="hover:opacity-80 transition-opacity">
              <Logo />
            </a>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className="relative">
                  <span className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location === item.href ? "text-primary" : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                  {location === item.href && (
                    <motion.div
                      className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"
                      layoutId="navbar-underline"
                      transition={{ type: "spring", bounce: 0.2 }}
                    />
                  )}
                </a>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                className="w-[200px] pl-10" 
                placeholder="Search products..." 
              />
            </div>
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="default" size="sm">Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}