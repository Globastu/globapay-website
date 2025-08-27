"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        scrolled ? "bg-white shadow-sm dark:bg-gray-900" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/globapay.png"
            alt="Globapay"
            width={120}
            height={40}
            priority
          />
        </Link>
        <ul className="hidden gap-8 text-sm font-medium md:flex">
          <li>
            <Link href="#solutions">Solutions</Link>
          </li>
          <li>
            <Link href="#demos">Demos</Link>
          </li>
          <li>
            <Link href="#platform">Platform</Link>
          </li>
          <li>
            <Link href="#contact">Contact</Link>
          </li>
        </ul>
        <button
          aria-label="Toggle Dark Mode"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </nav>
    </header>
  );
}
