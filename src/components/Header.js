"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, User, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from "./ThemeToggle";
import Image from 'next/image';
import SearchModal from './SearchModal';

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            ApexFeed
          </Link>

          <nav className="items-center hidden space-x-6 md:flex">
            <Link
              href="/blogs"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Blogs
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </Link>
            <ThemeToggle />
          </nav>

          <div className="items-center hidden space-x-4 md:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="text-sm font-medium"
            >
              <Search className="w-5 h-5" />
            </Button>
            {session ? (
              <>
                <Link
                  href={`/profile/${session.user.id}`}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  <div className="flex items-center space-x-2">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-8 h-8 rounded-full"
                        width={32}
                        height={32}
                      />
                    ) : (
                      <User className="w-8 h-8" />
                    )}
                    <span>{session.user.name}</span>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => signOut()}
                  className="text-sm font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="p-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="py-4 space-y-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/blogs"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button
                variant="ghost"
                className="justify-start text-sm font-medium"
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <div className="flex items-center">
                <ThemeToggle />
                <span className="ml-2 text-sm font-medium">Toggle Theme</span>
              </div>
            </nav>

            <div className="flex flex-col pt-4 space-y-4 border-t">
              {session ? (
                <>
                  <Link
                    href={`/profile/${session.user.id}`}
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      {session.user.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name}
                          className="w-8 h-8 rounded-full"
                          width={32}
                          height={32}
                        />
                      ) : (
                        <User className="w-8 h-8" />
                      )}
                      <span>{session.user.name}</span>
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">Sign In</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
