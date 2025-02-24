import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Footer from "@/components/Footer";
import { ShoppingBag, Heart, Star, Clock, Phone, Mail, MapPin } from "lucide-react";

export default function Profile() {
  const user = {
    name: "YusuF Faisal",
    role: "Technology Consultant",
    email: "yusufoesta5t@gmail.com",
    phone: "01518914860",
    location: "Noakhali, Bangladesh",
    orders: {
      total: 12,
      recent: [
        { id: 1, product: "Premium Laptop", date: "2024-02-20", status: "Delivered" },
        { id: 2, product: "Wireless Mouse", date: "2024-02-15", status: "Shipped" },
        { id: 3, product: "Monitor Stand", date: "2024-02-10", status: "Processing" }
      ]
    },
    wishlist: {
      count: 8,
      items: [
        { id: 1, name: "Gaming Keyboard", price: 129.99 },
        { id: 2, name: "Wireless Earbuds", price: 89.99 },
        { id: 3, name: "USB-C Hub", price: 49.99 }
      ]
    },
    stats: {
      totalSpent: 2499.99,
      avgOrderValue: 208.33,
      memberSince: "January 2024"
    }
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-8">
                <Avatar className="h-32 w-32">
                  <AvatarFallback className="text-3xl bg-primary/10">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-4xl font-bold">{user.name}</h1>
                      <p className="text-primary mt-1">Member since {user.stats.memberSince}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${user.stats.totalSpent}</p>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-6">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{user.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Tabs defaultValue="orders">
              <TabsList className="w-full">
                <TabsTrigger value="orders" className="flex-1">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex-1">
                  <Clock className="h-4 w-4 mr-2" />
                  Recent Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold">Recent Orders</h3>
                      <span className="text-sm text-muted-foreground">
                        Total Orders: {user.orders.total}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {user.orders.recent.map((order) => (
                        <div key={order.id} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                          <div>
                            <h4 className="font-medium">{order.product}</h4>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {order.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold">Wishlist Items</h3>
                      <span className="text-sm text-muted-foreground">
                        {user.wishlist.count} items
                      </span>
                    </div>
                    <div className="space-y-4">
                      {user.wishlist.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-medium">{item.name}</h4>
                          <span className="font-semibold">${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Placed an order</p>
                          <p className="text-sm text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Heart className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Added item to wishlist</p>
                          <p className="text-sm text-muted-foreground">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Star className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Reviewed a product</p>
                          <p className="text-sm text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}