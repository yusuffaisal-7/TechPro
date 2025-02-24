import ScrollAnimation from "@/components/ScrollAnimation";

export default function About() {
  return (
    <div className="min-h-screen pt-16">
      {/* Company Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h1 className="text-4xl font-bold text-center">About TechPro</h1>
            <p className="mt-6 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              We are a leading technology solutions provider dedicated to bringing innovative products to our customers.
            </p>
          </ScrollAnimation>

          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                alt="Team at work"
                className="rounded-lg"
              />
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div>
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="mt-4 text-muted-foreground">
                  To provide cutting-edge technology solutions that empower businesses and individuals to achieve more.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-center">Our Team</h2>
          </ScrollAnimation>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <ScrollAnimation key={member.name} delay={index * 0.2}>
                <div className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover"
                  />
                  <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const team = [
  {
    name: "John Doe",
    role: "CEO",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
  },
  // Add more team members
];
