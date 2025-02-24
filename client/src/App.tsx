import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/lib/cart";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import Reviews from "@/pages/Reviews";
import Contact from "@/pages/Contact";
import Profile from "@/pages/Profile";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/products" component={Products} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/contact" component={Contact} />
      <Route path="/profile" component={Profile} />
      <Route path="/cart" component={Cart} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="relative">
          <Navbar />
          <main>
            <Router />
          </main>
        </div>
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;