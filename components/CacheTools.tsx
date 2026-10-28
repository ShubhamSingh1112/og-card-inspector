"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, RefreshCw } from "lucide-react";

interface Props {
  url: string;
  onInspect: (url: string) => void;
}

function cacheBustedUrl(url: string) {
  const parsed = new URL(url);
  parsed.searchParams.set("v_og", Date.now().toString());
  return parsed.toString();
}

export function CacheTools({ url, onInspect }: Props) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const links = [
    { label: "Facebook debugger", href: `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(url)}` },
    { label: "LinkedIn inspector", href: `https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(url)}` },
    { label: "X post composer", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=Testing%20link%20preview` },
  ];

  const handleCopy = async () => {
    setCopyError(null);
    try {
      await navigator.clipboard.writeText(cacheBustedUrl(url));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError("Could not copy the cache-busted URL. Check your browser clipboard permissions.");
    }
  };

  return (
    <section className="cache-card" aria-label="Social platform cache tools">
      <h3>Refresh a cached preview</h3>
      <p>Social platforms can hold on to old card data. Open an official debugger or add a cache-busting URL parameter.</p>
      <div className="debugger-links">
        {links.map((link) => (
          <a className="debugger-link" href={link.href} key={link.label} target="_blank" rel="noopener noreferrer">
            {link.label} <ExternalLink size={14} />
          </a>
        ))}
      </div>
      <div className="cache-actions">
        <span>Test the page again with a fresh query parameter.</span>
        <div className="cache-buttons">
          <button className="secondary-button" type="button" onClick={() => onInspect(cacheBustedUrl(url))}>
            <RefreshCw size={14} /> Re-inspect
          </button>
          <button className="secondary-button" type="button" onClick={() => void handleCopy()}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy URL"}
          </button>
        </div>
      </div>
      {copyError && <p className="lead-error" role="alert">{copyError}</p>}
    </section>
  );
}
