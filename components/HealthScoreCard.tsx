"use client";

import { useState } from "react";
import { AlertTriangle, Check, CheckCircle2, ChevronDown, ChevronUp, Copy, XCircle } from "lucide-react";
import type { HealthReport, OgMetadata } from "@/types";

interface Props {
  report: HealthReport;
  metadata: OgMetadata;
}

function escapeAttribute(value: string) {
  return value.replace(/[&"<>]/g, (character) => ({
    "&": "&amp;",
    '"': "&quot;",
    "<": "&lt;",
    ">": "&gt;",
  })[character] ?? character);
}

export function HealthScoreCard({ report, metadata }: Props) {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [showAllIssues, setShowAllIssues] = useState(false);

  const scoreColor = report.score >= 85 ? "#24804a" : report.score >= 65 ? "#966214" : "#c9252d";
  const criticalCount = report.issues.filter((issue) => issue.severity === "critical").length;
  const warningCount = report.issues.filter((issue) => issue.severity === "warning").length;
  const goodCount = report.issues.filter((issue) => issue.severity === "good").length;
  const generatedMetaTags = [
    "<!-- Open Graph -->",
    '<meta property="og:type" content="website">',
    `<meta property="og:url" content="${escapeAttribute(metadata.url)}">`,
    `<meta property="og:title" content="${escapeAttribute(metadata.title)}">`,
    `<meta property="og:description" content="${escapeAttribute(metadata.description)}">`,
    metadata.image ? `<meta property="og:image" content="${escapeAttribute(metadata.image)}">` : "",
    metadata.image ? '<meta property="og:image:width" content="1200">' : "",
    metadata.image ? '<meta property="og:image:height" content="630">' : "",
    "",
    "<!-- X -->",
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:url" content="${escapeAttribute(metadata.url)}">`,
    `<meta name="twitter:title" content="${escapeAttribute(metadata.title)}">`,
    `<meta name="twitter:description" content="${escapeAttribute(metadata.description)}">`,
    metadata.image ? `<meta name="twitter:image" content="${escapeAttribute(metadata.image)}">` : "",
  ].filter(Boolean).join("\n");

  const handleCopy = async () => {
    setCopyError(null);
    try {
      await navigator.clipboard.writeText(generatedMetaTags);
      setCopiedSnippet(true);
      window.setTimeout(() => setCopiedSnippet(false), 2000);
    } catch {
      setCopyError("Could not copy metadata. Check your browser clipboard permissions.");
    }
  };

  const visibleIssues = showAllIssues ? report.issues : report.issues.slice(0, 4);

  return (
    <section className="score-card" aria-label="Metadata health audit">
      <div className="score-header">
        <div className="score-summary">
          <div className="score-gauge" aria-label={`Score ${report.score} out of 100`}>
            <svg viewBox="0 0 36 36" role="img" aria-hidden="true">
              <path d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831" fill="none" stroke="#e8e5de" strokeWidth="3.5" />
              <path d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831" fill="none" stroke={scoreColor} strokeWidth="3.5" strokeLinecap="round" strokeDasharray={`${report.score}, 100`} />
            </svg>
            <span>{report.score}</span>
          </div>
          <div>
            <h2 className="score-title">Metadata health</h2>
            <p className="score-detail">{goodCount} good · {warningCount} warnings · {criticalCount} critical</p>
          </div>
        </div>
        <button className="copy-button" type="button" onClick={() => void handleCopy()}>
          {copiedSnippet ? <Check size={14} /> : <Copy size={14} />}
          {copiedSnippet ? "Copied" : "Copy meta tags"}
        </button>
      </div>
      {copyError && <p className="lead-error" role="alert">{copyError}</p>}
      <div className="issue-list">
        {visibleIssues.map((issue) => {
          const Icon = issue.severity === "good" ? CheckCircle2 : issue.severity === "warning" ? AlertTriangle : XCircle;
          const iconColor = issue.severity === "good" ? "#24804a" : issue.severity === "warning" ? "#966214" : "#c9252d";
          return (
            <div className="issue-row" key={issue.id}>
              <Icon size={16} color={iconColor} aria-hidden="true" />
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.description}</p>
                {issue.recommendation && <p className="issue-tip">Tip: {issue.recommendation}</p>}
              </div>
            </div>
          );
        })}
        {report.issues.length > 4 && (
          <button className="show-issues" type="button" onClick={() => setShowAllIssues(!showAllIssues)}>
            {showAllIssues ? <>Show fewer <ChevronUp size={14} /></> : <>Show all {report.issues.length} checks <ChevronDown size={14} /></>}
          </button>
        )}
      </div>
    </section>
  );
}
