"use client";

import { useState } from "react";
import Scrollspy from "react-scrollspy";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "หน้าแรก", href: "#home" },
  { name: "ผู้ลงสมัคร", href: "#candidate" },
  { name: "กิจกรรม", href: "#event" },
  { name: "นโยบาย", href: "#policy" },
  { name: "เกี่ยวกับเรา", href: "#about" },
  { name: "ติดต่อเรา", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-t from-gd-red via-primary to-gd-yellow shadow-lg/25 z-50">
      <div className="max-w-7xl mx-auto px-8 md:px-4 py-3 md:py-4 flex justify-between items-center">
        <Image
          src="/logo/logo-white.PNG"
          alt="united tu party logo"
          width={110}
          height={110}
        />

        {/* Desktop Menu */}
        <Scrollspy
          items={navItems.map((item) => item.href.substring(1))}
          currentClassName="text-white font-bold underline underline-offset-6"
          className="hidden md:flex space-x-12"
          offset={-100}
        >
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-2xl text-white">
                {item.name}
              </a>
            </li>
          ))}
        </Scrollspy>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden px-6 pt-4 bg-white fixed top-20 left-0 w-full shadow-lg/50 z-40 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="space-y-2 divide-y-1 divide-gd-yellow ">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-2xl text-primary font-bold block pb-3 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
