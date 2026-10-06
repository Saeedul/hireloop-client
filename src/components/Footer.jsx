import Image from "next/image";
import Link from "next/link";
import { LogoFacebook, LogoLinkedin } from "@gravity-ui/icons";

const groups = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/worker-ai" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "/salary-data" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Career library", href: "/career-library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand-guideline" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
];

function BrandLogo() {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className="inline-flex h-11 w-38.5 shrink-0"
    >
      <Image
        src="/logo.svg"
        alt="HireLoop"
        width={154}
        height={44}
        className="h-11 w-38.5 object-contain"
      />
    </Link>
  );
}

function SocialIcon({ name }) {
  if (name === "facebook") {
    return <LogoFacebook aria-hidden="true" className="h-6 w-6" />;
  }

  if (name === "pinterest") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M12 2.5a9.5 9.5 0 0 0-3.46 18.35c-.08-.78-.15-1.98.03-2.83l1.1-4.66s-.28-.56-.28-1.4c0-1.31.76-2.28 1.7-2.28.8 0 1.19.6 1.19 1.32 0 .8-.51 2.01-.77 3.13-.22.93.47 1.69 1.39 1.69 1.67 0 2.96-1.76 2.96-4.3 0-2.25-1.62-3.82-3.94-3.82-2.68 0-4.25 2.01-4.25 4.09 0 .81.31 1.68.7 2.15.08.1.09.19.07.29l-.26 1.05c-.04.17-.14.21-.32.13-1.2-.56-1.96-2.31-1.96-3.72 0-3.03 2.2-5.81 6.34-5.81 3.33 0 5.92 2.37 5.92 5.54 0 3.3-2.08 5.96-4.97 5.96-.97 0-1.88-.51-2.2-1.11l-.6 2.28c-.22.84-.82 1.9-1.22 2.55A9.5 9.5 0 1 0 12 2.5Z" />
      </svg>
    );
  }

  return <LogoLinkedin aria-hidden="true" className="h-6 w-6" />;
}

const socials = [
  { name: "facebook", label: "Facebook", href: "#", featured: false },
  { name: "pinterest", label: "Pinterest", href: "#", featured: true },
  { name: "linkedin", label: "LinkedIn", href: "#", featured: false },
];

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-360 rounded-2xl bg-[#010103] px-5 py-10 text-white sm:px-8 lg:px-15">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16 xl:gap-[clamp(8rem,27.8vw,25rem)]">
        <div className="w-full max-w-[288px] shrink-0">
          <BrandLogo />
          <p className="mt-6 text-base leading-[1.9] text-white/50">
            The AI-native career platform. Built for people who take their work
            seriously.
          </p>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:gap-x-12">
          {groups.map((group) => (
            <section key={group.title} aria-labelledby={`footer-${group.title}`}>
              <h2
                id={`footer-${group.title}`}
                className="mb-6 text-lg font-medium leading-[1.4] text-[#5C53FE]"
              >
                {group.title}
              </h2>
              <ul className="space-y-2 text-base leading-[1.9] text-[#D0D5DD]/70">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-[#5C53FE]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <div className="mt-18 flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-center md:justify-between">
        <ul aria-label="Social media" className="flex items-center gap-2">
          {socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                aria-label={social.label}
                className={`flex h-10 w-10 items-center justify-center rounded-lg transition hover:brightness-125 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-white ${
                  social.featured ? "bg-[#5C53FE]" : "bg-white/5"
                }`}
              >
                <SocialIcon name={social.name} />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 text-sm leading-[1.9] text-[#ACABB2] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
          <p className="opacity-70">Copyright 2026 — GuyGatsby</p>
          <p>
            <Link href="/terms" className="hover:text-white">
              Terms &amp; Policy
            </Link>
            <span aria-hidden="true"> - </span>
            <Link href="/privacy" className="hover:text-white">
              Privacy Guideline
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
