import Link from "next/link";

import { buttonClassName } from "@/components/ui/Button";

const navItems = [
  { href: "/workflows", label: "Workflows" },
  { href: "/about", label: "Trust" },
  { href: "/request", label: "Request" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link
          className="flex items-center gap-2 text-base font-semibold tracking-tight text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
          href="/"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-300 bg-zinc-950 text-xs font-bold text-white">
            W
          </span>
          <span>WorknFlow</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1"
        >
          {navItems.map((item) => (
            <Link
              className="rounded-md px-3 py-1.5 text-sm font-medium text-zinc-600 hover:bg-white hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
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
