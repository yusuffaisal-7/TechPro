import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useLocation } from "wouter";
import ScrollAnimation from "@/components/ScrollAnimation";
import Footer from "@/components/Footer";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    });

    clearCart();
    setLocation("/");
  };

  if (items.length === 0) {
    setLocation("/cart");
    return null;
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h1 className="text-4xl font-bold">Checkout</h1>
        </ScrollAnimation>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <ScrollAnimation delay={0.2}>
            <div>
              <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" required placeholder="**** **** **** ****" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" required placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" required placeholder="***" />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Pay $${total}`}
                </Button>
              </form>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.4}>
            <div>
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-16 w-16 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold">${item.price * item.quantity}</p>
                      </div>
                    ))}

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${total}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between mt-2 font-semibold">
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollAnimation>
        </div>
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}
