import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "accent";
};

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        tone === "default" && "border-zinc-200 bg-zinc-50 text-zinc-700",
        tone === "accent" && "border-teal-200 bg-teal-50 text-teal-800",
        className,
      )}
      {...props}
    />
  );
}
