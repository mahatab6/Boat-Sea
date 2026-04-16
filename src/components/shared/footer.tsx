import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const footerLinks = {
    Company: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Press", path: "/press" },
      { name: "Blog", path: "/blog" },
    ],
    Boats: [
      { name: "Browse Boats", path: "/browse-boats" },
      { name: "Popular Routes", path: "/routes" },
      { name: "For Owners", path: "/for-owners" },
      { name: "Pricing", path: "/pricing" },
    ],
    Support: [
      { name: "Help Center", path: "/help" },
      { name: "Contact Us", path: "/contact" },
      { name: "Safety", path: "/safety" },
      { name: "FAQs", path: "/faqs" },
    ],
    Legal: [
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "Cancellation Policy", path: "/cancellation-policy" },
    ],
  };

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: FaXTwitter,
      href: "https://x.com",
      label: "Twitter",
    },
    {
      icon: FaLinkedinIn,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="w-full bg-background text-muted-foreground border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* Top Links */}
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
                      className="text-sm hover:text-primary transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  SA
                </span>
              </div>

              <span className="font-serif text-lg font-bold text-foreground tracking-tight">
                Boat Sea
              </span>
            </div>
          </Link>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Boat Sea Inc. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition group"
              >
                <social.icon className="w-4 h-4 group-hover:scale-110 transition" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;