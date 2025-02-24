import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold text-lg">TechPro</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Leading provider of innovative tech solutions.
            </p>
            <div className="mt-4 flex gap-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Mail className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <address className="mt-2 text-sm text-muted-foreground not-italic">
              <p>123 Tech Street</p>
              <p>Silicon Valley, CA 94025</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@techpro.com</p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about">
                  <a className="hover:text-primary">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="hover:text-primary">Shop</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="hover:text-primary">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="hover:text-primary">Terms of Service</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg">Subscribe</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Stay updated with our latest products and offers.
            </p>
            <div className="mt-4 space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TechPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}