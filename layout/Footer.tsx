import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://facebook.com" },
  { icon: <FaTwitter />, href: "https://twitter.com" },
  { icon: <FaInstagram />, href: "https://instagram.com" },
  { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
];

const services = [
  { name: "Visa Services", href: "/" },
  { name: "Passport Services", href: "/" },
  { name: "Agent Registration Form", href: "/" },
  { name: "OCI Card", href: "/" },
  { name: "Apostille & Legalization", href: "/" },
  { name: "Managed Service Program", href: "/" },
  { name: "Travel Medical Insurance", href: "/" },
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
  { name: "Terms & Condition", href: "/terms-and-condition" }, // internal page link
];

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Logo & Contact */}
        <div className="md:col-span-1">
          <Image
            src="/whiteLogo.png"
            width={200}
            height={50}
            alt="Quartus Logo"
            className="mb-4 object-contain"
          />
          <p className="text-sm mb-2">
            Simplifying Visa & Document Processes <br /> with Speed & Security.
          </p>
          <p className="text-sm mb-1">
            Email:{" "}
            <a
              href="mailto:info@quartusglobalservices.com"
              className="underline hover:text-gray-300"
            >
              info@quartusglobalservices.com
            </a>
          </p>
          <p className="text-sm">Contact Number: 713-534-1245</p>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-3">SERVICES</h3>
          <ul className="space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.name}>
                <Link href={service.href} className="hover:underline">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            {company.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">RESOURCES</h3>
          <ul className="space-y-2 text-sm">
            {resources.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-3">FOLLOW US</h3>
          <div className="flex gap-4 text-lg">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-400 mt-10">
        Copyright ©2025 Quartus. All rights reserved.
      </div>
    </footer>
  );
};
