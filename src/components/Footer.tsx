import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-muted/30 to-muted/60 border-t border-maroon/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-maroon mb-4">
              SilkCity
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Preserving India's textile heritage through authentic Dharmavaram silk sarees
              and traditional craftsmanship.
            </p>
            <div className="flex gap-3">
              <SocialIcon href="#" icon={<Facebook className="w-4 h-4" />} />
              <SocialIcon href="#" icon={<Instagram className="w-4 h-4" />} />
              <SocialIcon href="#" icon={<Twitter className="w-4 h-4" />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-maroon mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="/#regions">Browse Regions</FooterLink>
              <FooterLink href="/sarees">All Sarees</FooterLink>
              <FooterLink href="/custom-builder">Custom Builder</FooterLink>
              <FooterLink href="/gallery/dharmavaram">Workshop Gallery</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-maroon mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <FooterLink href="/orders">Track Order</FooterLink>
              <FooterLink href="/shipping">Shipping Policy</FooterLink>
              <FooterLink href="/returns">Returns & Exchanges</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-maroon mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Dharmavaram, Andhra Pradesh, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@silkcity.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-maroon/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SilkCity. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-maroon transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-maroon transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted-foreground hover:text-maroon transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="w-8 h-8 rounded-full bg-maroon/10 hover:bg-maroon hover:text-white flex items-center justify-center transition-colors"
    >
      {icon}
    </Link>
  );
}


