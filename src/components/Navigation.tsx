"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation({ cartCount = 0 }: { cartCount?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav 
      className="sticky top-0 z-50 border-b border-maroon/10 shadow-lg"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(15px)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 sm:gap-2 group">
            <motion.div
              className="text-xl sm:text-2xl font-serif font-bold text-maroon"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              SilkCity
            </motion.div>
            <div className="hidden sm:block text-xs text-muted-foreground">
              Dharmavaram Heritage
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/#regions">Regions</NavLink>
            <NavLink href="/sarees">All Sarees</NavLink>
            <NavLink href="/custom-builder">Custom Builder</NavLink>
            <NavLink href="/gallery/dharmavaram">Gallery</NavLink>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden sm:flex h-8 w-8 sm:h-10 sm:w-10">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-xs bg-maroon"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-48 bg-white/95 backdrop-blur-md border-2 border-gray-200 shadow-2xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <DropdownMenuLabel className="text-gray-900 font-semibold text-base">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-300" />
                  <DropdownMenuItem asChild className="text-gray-800 hover:bg-gray-100 hover:text-gray-900">
                    <Link href="/profile" className="font-medium">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-gray-800 hover:bg-gray-100 hover:text-gray-900">
                    <Link href="/orders" className="font-medium">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-gray-800 hover:bg-gray-100 hover:text-gray-900">
                    <Link href="/custom-requests" className="font-medium">Custom Requests</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-300" />
                  <DropdownMenuItem asChild className="text-gray-800 hover:bg-gray-100 hover:text-gray-900">
                    <Link href="/admin" className="font-medium">Admin Panel</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-300" />
                  <DropdownMenuItem asChild className="text-gray-800 hover:bg-gray-100 hover:text-gray-900">
                    <Link href="/login" className="font-medium">Sign In</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8 sm:h-10 sm:w-10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-maroon/10 bg-white/95 backdrop-blur-md"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="py-4 space-y-2 px-4">
                <MobileNavLink href="/#regions" onClick={() => setIsOpen(false)}>
                  Regions
                </MobileNavLink>
                <MobileNavLink href="/sarees" onClick={() => setIsOpen(false)}>
                  All Sarees
                </MobileNavLink>
                <MobileNavLink href="/custom-builder" onClick={() => setIsOpen(false)}>
                  Custom Builder
                </MobileNavLink>
                <MobileNavLink href="/gallery/dharmavaram" onClick={() => setIsOpen(false)}>
                  Gallery
                </MobileNavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-muted-foreground hover:text-maroon transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-base font-semibold text-gray-800 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
    >
      {children}
    </Link>
  );
}

