import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Footer from "@/components/Footer";

export default function Profile() {
  const user = {
    name: "YusuF Faisal",
    email: "yusufoesta5t@gmail.com",
    phone: "01518914860",
    address: "Noakhali Science and Technology University",
    department: "Computer Science and Engineering",
    interests: ["Technology", "Programming", "Innovation"],
    about: "Passionate about technology and innovation. Always eager to learn and explore new possibilities in the tech world."
  };

  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground mt-1">{user.department}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Tabs defaultValue="info">
                <TabsList className="w-full">
                  <TabsTrigger value="info" className="flex-1">
                    Personal Information
                  </TabsTrigger>
                  <TabsTrigger value="interests" className="flex-1">
                    Interests & About
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Email</Label>
                          <p className="mt-1 text-muted-foreground">{user.email}</p>
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <p className="mt-1 text-muted-foreground">{user.phone}</p>
                        </div>
                        <div>
                          <Label>Address</Label>
                          <p className="mt-1 text-muted-foreground">{user.address}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="interests" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Interests</Label>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {user.interests.map((interest) => (
                              <span
                                key={interest}
                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>About</Label>
                          <p className="mt-1 text-muted-foreground">{user.about}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}