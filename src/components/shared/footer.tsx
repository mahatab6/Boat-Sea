import Link from 'next/link';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaXTwitter 
} from "react-icons/fa6";

const Footer = () => {
  const footerLinks = {
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '#' },
      { name: 'Press', path: '#' },
      { name: 'Blog', path: '#' },
    ],
    Boats: [
      { name: 'Browse Boats', path: '/browse-boats' },
      { name: 'Popular Routes', path: '/routes' },
      { name: 'For Owners', path: '/for-owners' },
      { name: 'Pricing', path: '#' },
    ],
    Support: [
      { name: 'Help Center', path: '#' },
      { name: 'Contact Us', path: '#' },
      { name: 'Safety', path: '#' },
      { name: 'FAQs', path: '#' },
    ],
    Legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Cookie Policy', path: '#' },
      { name: 'Cancellation Policy', path: '#' },
    ],
  };

  const socialLinks = [
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaXTwitter, href: '#', label: 'X (Twitter)' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="w-full bg-muted text-muted-foreground border-t border-border mt-auto ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Top Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col space-y-4">
              <span className="font-bold text-foreground text-sm tracking-wider uppercase">
                {category}
              </span>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-sm hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Branding & Socials */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">SA</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg font-bold text-foreground tracking-tight">Boat Sea</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground md:order-none order-last">
            © {new Date().getFullYear()} Boat Sea Inc. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
              >
                <social.icon className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;