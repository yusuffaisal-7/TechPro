import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold">Shopping Cart</h1>

        {items.length === 0 ? (
          <p className="text-center text-muted-foreground mt-12">Your cart is empty</p>
        ) : (
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-24 w-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            ${item.price}
                          </p>
                          <div className="flex items-center gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-20 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t pt-2 mt-4">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-6">Proceed to Checkout</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
