"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

type CopyButtonProps = {
  text: string;
  label?: string;
};

export function CopyButton({ text, label = "Copy prompt" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Button
      aria-label={copied ? "Copied to clipboard" : label}
      onClick={handleCopy}
      variant="secondary"
    >
      {copied ? "Copied" : label}
    </Button>
  );
}
