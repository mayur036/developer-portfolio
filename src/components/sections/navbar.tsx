'use client';

import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NAV_LINKS, PERSONAL } from '@/src/data/portfolio';
import { ColorPicker } from '@/src/components/color-picker';
import { ThemeToggle } from '@/src/components/theme-toggle';

export function Navbar(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileOpen(false);
      if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: 'smooth' });
    },
    [],
  );

  return (
    <motion.header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        {/* Logo */}
        <a
          href="#"
          id="nav-logo"
          className="font-heading text-lg font-bold text-heading transition-colors hover:text-accent"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {PERSONAL.name.split(' ')[0]}
          <span className="text-accent">.</span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                id={`nav-item-${link.href.replace('#', '')}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-body transition-colors hover:bg-accent/10 hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: availability + theme toggle + mobile menu */}
        <div className="flex items-center gap-3">
          {/* Availability indicator */}
          <div className="hidden items-center gap-2 rounded-full border border-border-color bg-surface px-3 py-1.5 sm:flex">
            <span className="status-dot size-2 rounded-full bg-green-500" />
            <span className="text-xs font-medium text-body">Available</span>
          </div>

          <ColorPicker />
          <ThemeToggle />

          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent
              side="right"
              className="w-64 border-l border-border-color bg-surface p-6"
            >
              <SheetHeader className="mb-8 text-left">
                <SheetTitle className="font-heading text-lg font-bold">
                  Menu
                </SheetTitle>
              </SheetHeader>

              {/* Mobile availability */}
              <div className="mb-6 flex items-center gap-2 rounded-full border border-border-color px-3 py-1.5 w-fit">
                <span className="status-dot size-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium text-body">Available</span>
              </div>

              {/* Mobile color picker */}
              <div className="mb-6">
                <ColorPicker />
              </div>

              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      id={`nav-item-mobile-${link.href.replace('#', '')}`}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex min-h-[44px] items-center rounded-lg px-4 text-sm font-medium text-body transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
