"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "หน้าแรก", href: "/#home" },
  { name: "ผู้ลงสมัคร", href: "/#candidate" },
  { name: "กิจกรรม", href: "/#event" },
  { name: "นโยบาย", href: "/#policy" },
  { name: "เกี่ยวกับเรา", href: "/#about" },
  {
    name: "ร้องเรียนปัญหา",
    dropdown: [
      { name: "ทั่วไป", href: "/report/general" },
      { name: "การขนส่งภายใน", href: "/report/transport" },
      { name: "Lost and Found", href: "/report/lostfound" },
    ],
  },
  { name: "ติดต่อเรา", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <ul className="hidden md:flex space-x-12 items-center font-bold">
          {navItems.map((item) =>
            item.dropdown ? (
              <li
                key={item.name}
                className="relative group text-white text-2xl cursor-pointer"
              >
                <div className="flex items-center">
                  {item.name}
                  <ChevronDown size={24} />
                </div>
                <div className="absolute bg-white divide-y-1 divide-zinc-200 top-full hidden group-hover:block group-hover:pointer-events-auto z-50">
                  <ul className="">
                    {item.dropdown.map((sub) => (
                      <li key={sub.href}>
                        <a
                          href={sub.href}
                          className="block p-1 px-3 text-zinc-700 hover:bg-primary hover:text-white whitespace-nowrap transition-all duration-300 "
                        >
                          {sub.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <a href={item.href} className="text-2xl text-white">
                  {item.name}
                </a>
              </li>
            )
          )}
        </ul>

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
          {navItems.map((item) =>
            item.dropdown ? (
              <li key={item.name}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-2xl text-primary font-bold block pb-2 cursor-pointer"
                >
                  <div className="flex items-center">
                    {item.name}
                    {dropdownOpen ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </div>
                </button>
                {dropdownOpen && (
                  <ul className="pl-4 space-y-3 divide-y-1 divide-gd-yellow">
                    {item.dropdown.map((sub) => (
                      <li key={sub.href}>
                        <a
                          href={sub.href}
                          className="text-2xl/4 text-primary block pb-3"
                          onClick={() => setIsOpen(false)}
                        >
                          {sub.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-2xl text-primary font-bold block pb-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}
