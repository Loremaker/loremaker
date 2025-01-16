"use client";

import { useState } from "react";
import { ClipboardIcon, CheckIcon } from "lucide-react";

export function ContractAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div
      className="flex items-center px-3 md:px-0 gap-2 group cursor-pointer relative flex-wrap md:flex-nowrap"
      onClick={() => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      <pre className="text-white/70 group-hover:text-white transition-colors break-all whitespace-pre-wrap flex-1">
        {address}
      </pre>
      <div className="flex-shrink-0">
        {!copied ? (
          <ClipboardIcon className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
        ) : (
          <CheckIcon className="h-4 w-4 text-green-500 animate-in fade-in duration-300" />
        )}
      </div>
    </div>
  );
}
