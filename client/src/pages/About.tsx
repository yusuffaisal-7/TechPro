import ScrollAnimation from "@/components/ScrollAnimation";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

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
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                  alt="Team at work"
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <motion.div 
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="mt-4 text-muted-foreground">
                  To provide cutting-edge technology solutions that empower businesses and individuals to achieve more.
                </p>
              </motion.div>
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
                <motion.div 
                  className="text-center group"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative inline-block"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 rounded-full mx-auto object-cover 
                        group-hover:shadow-lg transition-shadow duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  <h3 className="mt-4 text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                    {member.role}
                  </p>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

const team = [
  {
    name: "John Doe",
    role: "CEO",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  },
  {
    name: "Mike Johnson",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
];