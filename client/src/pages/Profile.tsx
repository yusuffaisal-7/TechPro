import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Footer from "@/components/Footer";

export default function Profile() {
  const user = {
    name: "YusuF Faisal",
    role: "Technology Consultant",
    email: "yusufoesta5t@gmail.com",
    phone: "01518914860",
    location: "Noakhali, Bangladesh",
    expertise: ["Tech Solutions", "Digital Innovation", "Product Strategy", "Business Development"],
    about: "Experienced technology consultant specializing in innovative digital solutions and strategic business transformation. With a proven track record in delivering high-impact tech solutions across various industries.",
    experience: [
      {
        title: "Senior Tech Consultant",
        company: "TechPro Solutions",
        period: "2020 - Present"
      },
      {
        title: "Digital Strategist",
        company: "Innovation Labs",
        period: "2018 - 2020"
      }
    ],
    certifications: ["AWS Certified Solutions Architect", "Google Cloud Professional", "Microsoft Azure Expert"]
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-8">
                  <Avatar className="h-32 w-32">
                    <AvatarFallback className="text-3xl bg-primary/10">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-4xl font-bold">{user.name}</h1>
                    <p className="text-xl text-primary mt-2">{user.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Tabs defaultValue="info">
                <TabsList className="w-full">
                  <TabsTrigger value="info" className="flex-1">
                    Professional Info
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="flex-1">
                    Experience & Expertise
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="mt-6">
                  <Card>
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div>
                          <Label className="text-lg">Contact Information</Label>
                          <div className="mt-4 space-y-3">
                            <p className="flex items-center gap-2">
                              <span className="font-semibold">Email:</span>
                              <span className="text-muted-foreground">{user.email}</span>
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="font-semibold">Phone:</span>
                              <span className="text-muted-foreground">{user.phone}</span>
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="font-semibold">Location:</span>
                              <span className="text-muted-foreground">{user.location}</span>
                            </p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-lg">About</Label>
                          <p className="mt-4 text-muted-foreground leading-relaxed">
                            {user.about}
                          </p>
                        </div>
                        <div>
                          <Label className="text-lg">Certifications</Label>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {user.certifications.map((cert) => (
                              <span
                                key={cert}
                                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="experience" className="mt-6">
                  <Card>
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div>
                          <Label className="text-lg">Areas of Expertise</Label>
                          <div className="mt-4 flex flex-wrap gap-3">
                            {user.expertise.map((skill) => (
                              <span
                                key={skill}
                                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-lg">Professional Experience</Label>
                          <div className="mt-4 space-y-4">
                            {user.experience.map((exp) => (
                              <div key={exp.title} className="border-l-2 border-primary/20 pl-4">
                                <h3 className="font-semibold text-lg">{exp.title}</h3>
                                <p className="text-primary">{exp.company}</p>
                                <p className="text-sm text-muted-foreground">{exp.period}</p>
                              </div>
                            ))}
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
      </div>
      <Footer />
    </div>
  );
}