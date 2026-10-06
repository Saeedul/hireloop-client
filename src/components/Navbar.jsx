"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 mx-3 mt-3">
      <nav
        aria-label="Main navigation"
        className="rounded-3xl bg-[#202020] px-5 text-white sm:px-8"
      >
        <div className="flex min-h-20 items-center justify-between">
          <Link href="/" aria-label="HireLoop home" className="shrink-0">
            <Image
              src="/logo.svg"
              alt="HireLoop"
              width={230}
              height={66}
              preload
              className="h-auto w-38.5 sm:w-45 lg:w-57.5"
            />
          </Link>

          <ul className="hidden items-center gap-10 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/90 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li aria-hidden="true" className="h-8 w-px bg-white/25" />

            <li>
              <Link
                href="/sign-in"
                className="font-medium text-[#7167FF] transition hover:text-[#948DFF]"
              >
                Sign In
              </Link>
            </li>

            <li>
              <Link
                href="/get-started"
                className="rounded-2xl bg-[#6257F5] px-6 py-3 font-semibold text-white transition hover:bg-[#5146E8]"
              >
                Get Started
              </Link>
            </li>
          </ul>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-white/10 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-[#7167FF] lg:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6"
            >
              {isMenuOpen ? (
                <path
                  d="m6 6 12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-white/10 py-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-xl px-3 py-3 text-white/90 transition hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="my-2 border-t border-white/10" />

              <li>
                <Link
                  href="/sign-in"
                  onClick={closeMenu}
                  className="block rounded-xl px-3 py-3 font-medium text-[#948DFF] transition hover:bg-white/10"
                >
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  href="/get-started"
                  onClick={closeMenu}
                  className="mt-2 block rounded-xl bg-[#6257F5] px-4 py-3 text-center font-semibold text-white transition hover:bg-[#5146E8]"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
