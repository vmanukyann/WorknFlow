import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-7 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Tested workflows with context, examples, and checks before trust.</p>
        <div className="flex gap-4">
          <Link className="hover:text-zinc-950" href="/about">
            Trust
          </Link>
          <Link className="hover:text-zinc-950" href="/request">
            Request
          </Link>
        </div>
      </div>
    </footer>
  );
}
