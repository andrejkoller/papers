"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { headerConfig } from "@/configs/header.config";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Tooltip } from "@/components/tooltip";
import { cn } from "@/lib/merge-classes";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="w-full bg-(--background)" aria-label="Header">
      {/* Top bar - Logo */}
      <div className="flex h-(--header-height) w-full items-center justify-center border-b border-(--border)">
        <Link
          href="/"
          aria-label="Home"
          className="flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-sm font-medium tracking-wide">
            {/* SVG Logo coming soon */}
          </span>
        </Link>
      </div>

      {/* Subheader */}
      <nav
        className="flex h-(--subheader-height) w-full items-center border-b border-(--border)"
        aria-label="Primary"
      >
        <div className="layout-container flex h-full w-full items-center justify-between">
          {/* Mobile: Menu Button */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative flex size-8 items-center justify-center md:hidden"
          >
            <div className="relative h-2 w-4">
              {/* Top bar */}
              <span
                className={cn(
                  "absolute left-0 top-0 block h-0.5 w-full origin-center rounded-[1px] bg-(--foreground) transition-all duration-300",
                  isOpen && "top-1/2 -translate-y-1/2 rotate-45",
                )}
              />
              {/* Bottom bar */}
              <span
                className={cn(
                  "absolute left-0 bottom-0 block h-0.5 w-full origin-center rounded-[1px] bg-(--foreground) transition-all duration-300",
                  isOpen && "bottom-1/2 translate-y-1/2 -rotate-45",
                )}
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-6 md:flex">
            {headerConfig.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.title}
                  className="font-bold font-(family-name:--font-geist-mono) underline"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Theme Switcher */}
          <div className="flex items-center">
            <Tooltip content="Toggle theme (Shift + D)" side="bottom">
              <ThemeSwitcher />
            </Tooltip>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 top-[calc(var(--header-height)+var(--subheader-height))] z-50 bg-(--background) transition-all duration-300 md:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex h-full flex-col p-6">
          <ul className="flex flex-col gap-6">
            {headerConfig.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.title}
                  onClick={() => setIsOpen(false)}
                  className="block text-xl font-bold font-(family-name:--font-geist-mono) underline"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
