"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Gündem", href: "/category/general" },
  { name: "Ekonomi", href: "/category/business" },
  { name: "Spor", href: "/category/sports" },
  { name: "Teknoloji", href: "/category/technology" },
  { name: "Dünya", href: "/category/world" }, // NewsAPI doesn't have 'world' specifically, maybe 'general' or fetch specific sources
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="select-none font-extrabold text-2xl">
            <span className="text-black">Son</span>
            <span className="text-red-600">Haber</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="relative inline-block px-1 text-sm font-medium text-zinc-800 transition-colors hover:text-black group"
                  >
                    <span>{link.name}</span>
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Ara"
              className="group rounded-full border border-zinc-200 p-2 transition-colors hover:border-zinc-300 hidden sm:block"
            >
              <Search className="h-5 w-5 text-zinc-700 group-hover:text-black" />
            </button>
            <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-700 transition cursor-pointer">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Canlı Yayın
            </span>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-zinc-700 hover:text-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-4 shadow-lg absolute w-full left-0 top-16">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block text-base font-medium text-zinc-800 hover:text-red-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
