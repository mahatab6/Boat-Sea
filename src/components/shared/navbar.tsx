/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./toggle";
import logoutAction from "../modules/auth/logoutAction";
import { toast } from "sonner";

interface useActiveProps {
  userActive: boolean;
}

const Navbar = ({ userActive }: useActiveProps) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = userActive;

  const handleLogout = async () => {
    const result = await logoutAction();
    if (result.success) {
      toast.success("Logged out successfully");
      redirect("/");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Boats", path: "/browse-boats" },
    { name: "Routes", path: "/routes" },
    { name: "For Owners", path: "/for-owners" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">
                SA
              </span>
            </div>
            <span className="font-serif text-2xl font-bold text-foreground">
              Boat Sea
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Dashboard Button */}
                <Button
                  variant="outline"
                  className="rounded-full px-5 hover:bg-primary/5 hover:border-primary transition cursor-pointer"
                  asChild
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>

                {/* Logout Button */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="rounded-full px-5 text-destructive hover:text-destructive hover:bg-destructive/10 transition cursor-pointer"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="rounded-full hover:cursor-pointer"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="rounded-full hover:cursor-pointer">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Screen Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <ModeToggle />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg hover:cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isActive(link.path)
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80 hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <hr className="my-2 border-border mx-4" />

              {/* Conditionally render based on authentication */}
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2 px-4">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:cursor-pointer"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 hover:cursor-pointer"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:cursor-pointer"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full justify-start hover:cursor-pointer">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
