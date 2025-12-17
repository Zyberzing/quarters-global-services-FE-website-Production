import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { MapPin, Mail, Phone } from "lucide-react";

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://facebook.com" },
  { icon: <FaTwitter />, href: "https://twitter.com" },
  { icon: <FaInstagram />, href: "https://instagram.com" },
  { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
];

const services = [
  { name: "Visa Services", href: "/category?toCountrySlug=united-states&Slug=visa" },
  { name: "Passport Services", href: "/category?toCountrySlug=united-states&Slug=passport" },
  { name: "Agent Registration Form", href: "https://quartus-five.vercel.app/agent/onboard" },
  { name: "OCI Card", href: "/category?toCountrySlug=india&Slug=oci-card" },
  { name: "Apostille & Legalization", href: "/category?toCountrySlug=united-states&Slug=apostille-and-legalization" },
  { name: "Managed Service Program", href: "/" },
  { name: "Travel Medical Insurance", href: "/other-services/travel-insurance" },
];

const company = [
  { name: "About Us", href: "/about-us" },
  { name: "Blogs", href: "/blogs" },
  { name: "Testimonials", href: "/" },
  { name: "Locations", href: "/" },
  { name: "Job Openings", href: "/" },
];

const resources = [
  { name: "Support", href: "/support" },
  { name: "Help Center", href: "/help-center" },
  { name: "Legal", href: "/legal" },
  { name: "Policies", href: "/policies" },
  { name: "Terms & Condition", href: "/terms-and-condition" },
];

export const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

          {/* Logo & Contact */}
          <div className="md:col-span-1 space-y-4">
            <Image
              src="/whiteLogo.png"
              width={200}
              height={50}
              alt="Quartus Logo"
              className="object-contain"
            />

            <p className="text-sm text-gray-300">
              Simplifying Visa & Document Processes <br />
              with Speed & Security.
            </p>

            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-gray-400" />
                <span>
                  2427 FM 1092 Rd, Unit A <br />
                  Missouri City, TX 77459 <br />
                  United States
                </span>
              </p>

              <p className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <a
                  href="mailto:info@quartusglobalservices.com"
                  className="hover:underline hover:text-white"
                >
                  info@quartusglobalservices.com
                </a>
              </p>

              <p className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <span>713-534-1245</span>
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="ml-6">
            <h3 className="font-semibold mb-4 tracking-wide">SERVICES</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="hover:text-white">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 tracking-wide">COMPANY</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 tracking-wide">RESOURCES</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4 tracking-wide">FOLLOW US</h3>
            <div className="flex gap-4 text-lg text-gray-300">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-400">
        © 2025 Quartus Global Services. All rights reserved.
      </div>
    </footer>
  );
};
