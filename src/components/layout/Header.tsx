import Link from "next/link";

import { buttonClassName } from "@/components/ui/Button";

const navItems = [
  { href: "/workflows", label: "Workflows" },
  { href: "/about", label: "Trust" },
  { href: "/request", label: "Request" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link
          className="text-base font-semibold tracking-tight text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
          href="/"
        >
          WorknFlow
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              className="text-sm font-medium text-zinc-600 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className={buttonClassName("secondary", "hidden lg:inline-flex")} href="/workflows">
          Browse workflows
        </Link>
      </div>
    </header>
  );
}
