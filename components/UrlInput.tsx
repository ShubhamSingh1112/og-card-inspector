"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle, Search } from "lucide-react";

interface Props {
  onInspect: (url: string) => void;
  isLoading: boolean;
}

const SAMPLE_URLS = [
  { label: "GitHub", url: "https://github.com" },
  { label: "Vercel", url: "https://vercel.com" },
  { label: "Stripe", url: "https://stripe.com" },
  { label: "Next.js", url: "https://nextjs.org" },
];

export function UrlInput({ onInspect, isLoading }: Props) {
  const [inputUrl, setInputUrl] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputUrl.trim() && !isLoading) onInspect(inputUrl.trim());
  };

  const handleSelectSample = (sampleUrl: string) => {
    setInputUrl(sampleUrl);
    onInspect(sampleUrl);
  };

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <div className="url-field">
        <Search size={19} aria-hidden="true" />
        <input
          type="text"
          value={inputUrl}
          onChange={(event) => setInputUrl(event.target.value)}
          placeholder="Paste a page URL to inspect…"
          aria-label="Website URL to inspect"
          inputMode="url"
          autoComplete="url"
          disabled={isLoading}
          required
        />
        <button className="primary-button" type="submit" disabled={isLoading || !inputUrl.trim()}>
          {isLoading ? <LoaderCircle size={16} className="animate-spin" /> : <ArrowRight size={16} />}
          {isLoading ? "Checking…" : "Inspect page"}
        </button>
      </div>
      <div className="sample-links">
        <span className="sample-label">Try a page:</span>
        {SAMPLE_URLS.map((sample) => (
          <button
            className="sample-button"
            key={sample.label}
            type="button"
            disabled={isLoading}
            onClick={() => handleSelectSample(sample.url)}
          >
            {sample.label}
          </button>
        ))}
      </div>
    </form>
  );
}
