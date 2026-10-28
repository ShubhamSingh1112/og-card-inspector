"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Check, Share2, Sparkles } from "lucide-react";
import { CacheTools } from "@/components/CacheTools";
import { HealthScoreCard } from "@/components/HealthScoreCard";
import { LeadMagnetBanner } from "@/components/LeadMagnetBanner";
import { PlatformSwitcher } from "@/components/PlatformSwitcher";
import { UrlInput } from "@/components/UrlInput";
import { evaluateMetaHealth } from "@/lib/health-score";
import type { HealthReport, OgMetadata } from "@/types";

function isOgMetadata(value: unknown): value is OgMetadata {
  if (!value || typeof value !== "object") return false;
  const metadata = value as Record<string, unknown>;
  return (
    typeof metadata.url === "string" &&
    typeof metadata.title === "string" &&
    typeof metadata.description === "string" &&
    typeof metadata.image === "string" &&
    typeof metadata.siteName === "string" &&
    typeof metadata.twitterCard === "string"
  );
}

async function fetchMetadata(targetUrl: string): Promise<OgMetadata> {
  const response = await fetch(`/api/scrape?url=${encodeURIComponent(targetUrl)}`);
  const result: unknown = await response.json();
  if (!result || typeof result !== "object") {
    throw new Error("The inspector returned an invalid response.");
  }
  const payload = result as { success?: unknown; error?: unknown; data?: unknown };
  if (!response.ok || payload.success !== true || !isOgMetadata(payload.data)) {
    throw new Error(typeof payload.error === "string" ? payload.error : "Failed to inspect link.");
  }
  return payload.data;
}

export function InspectorApp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<OgMetadata | null>(null);
  const [report, setReport] = useState<HealthReport | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleInspect = async (targetUrl: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMetadata(targetUrl);
      setMetadata(data);
      setReport(evaluateMetaHealth(data));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "An unexpected error occurred while fetching the URL.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    const sharedUrl = new URLSearchParams(window.location.search).get("url");
    if (!sharedUrl) return;

    void fetchMetadata(sharedUrl)
      .then((data) => {
        if (!active) return;
        setMetadata(data);
        setReport(evaluateMetaHealth(data));
      })
      .catch((caught: unknown) => {
        if (active) {
          setError(caught instanceof Error ? caught.message : "An unexpected error occurred while fetching the URL.");
        }
      });

    return () => { active = false; };
  }, []);

  const handleShare = async () => {
    if (!metadata) return;
    try {
      await navigator.clipboard.writeText(`${window.location.origin}?url=${encodeURIComponent(metadata.url)}`);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      setError("Could not copy the report link. Check your browser clipboard permissions.");
    }
  };

  return (
    <div className="inspector">
      <div className="inspector-toolbar">
        <span><Sparkles size={15} /> SOCIAL CARD INSPECTOR</span>
        {metadata && (
          <button type="button" className="text-button" onClick={handleShare}>
            {copiedLink ? <Check size={15} /> : <Share2 size={15} />}
            {copiedLink ? "Copied" : "Share audit"}
          </button>
        )}
      </div>
      <UrlInput onInspect={handleInspect} isLoading={loading} />

      {error && (
        <div className="error-banner" role="alert">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {loading && <p className="loading-message" role="status">Reading page metadata…</p>}

      {metadata && report && !loading && (
        <div className="results">
          <HealthScoreCard report={report} metadata={metadata} />
          <section className="preview-section">
            <div className="results-heading">
              <div><p className="eyebrow">YOUR LINK, IN CONTEXT</p><h2>Social card previews</h2></div>
              <p>Approximate previews based on the metadata found on your page.</p>
            </div>
            <PlatformSwitcher metadata={metadata} />
          </section>
          <CacheTools url={metadata.url} onInspect={handleInspect} />
          <LeadMagnetBanner />
        </div>
      )}
    </div>
  );
}
