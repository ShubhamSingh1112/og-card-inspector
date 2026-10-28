"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Mail, ShieldCheck } from "lucide-react";

export function LeadMagnetBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to subscribe. Please try again.");
      }
      setStatus("success");
      setMessage(data.message || "You're on the list!");
      setEmail("");
    } catch (caught) {
      setStatus("error");
      setMessage(caught instanceof Error ? caught.message : "Network error. Please try again later.");
    }
  };

  return (
    <section className="lead-card" aria-label="Early access newsletter">
      <span className="lead-badge">A NOTE FROM THE MAKERS</span>
      <h3>More useful tools. Less guesswork.</h3>
      <p>Get occasional updates when we release practical tools for better web sharing and discoverability.</p>
      {status === "success" ? (
        <p className="lead-success" role="status"><Check size={15} /> {message}</p>
      ) : (
        <form className="lead-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="updates-email">Email address</label>
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={15} aria-hidden="true" />
            <input id="updates-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required disabled={status === "loading"} />
          </div>
          <button className="secondary-button" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Joining…" : "Get updates"} <ArrowRight size={14} />
          </button>
        </form>
      )}
      {status === "error" && <p className="lead-error" role="alert">{message}</p>}
      <p className="lead-note"><ShieldCheck size={14} /> Occasional email. Unsubscribe any time.</p>
    </section>
  );
}
