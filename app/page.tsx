import Link from "next/link";
import { ArrowDown, Check, Image as ImageIcon, Search, Share2, ShieldCheck } from "lucide-react";
import { InspectorApp } from "@/components/InspectorApp";

const checks = [
  "Open Graph and X card tags",
  "Title and description quality",
  "Image availability and dimensions",
  "Canonical URL and favicon",
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "OG Card Inspector",
  description:
    "Preview social cards and audit Open Graph metadata for your website, for free.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <header className="site-header">
        <Link className="brand" href="/" aria-label="OG Inspector home">
          <span className="brand-mark">O</span>
          <span>OG Inspector<span className="brand-period">.</span></span>
        </Link>
        <a className="header-link" href="#how-it-works">How it works <ArrowDown size={15} /></a>
      </header>

      <section className="hero">
        <div className="eyebrow"><span className="eyebrow-dot" /> FREE SOCIAL PREVIEW & META TAG AUDIT</div>
        <h1>Make every link<br /><em>worth clicking.</em></h1>
        <p className="hero-copy">
          Preview how your page appears when shared. Catch missing social
          metadata before it costs you a click.
        </p>
        <InspectorApp />
        <div className="trust-line"><ShieldCheck size={15} /> Free to use <span>·</span> No account needed <span>·</span> Results in seconds</div>
      </section>

      <section className="value-section" id="how-it-works">
        <div className="section-intro">
          <p className="eyebrow">A BETTER FIRST IMPRESSION</p>
          <h2>One link. Every preview.<br /><em>Nothing left to guess.</em></h2>
          <p>Social platforms read metadata differently. OG Inspector shows you what they can see, and flags what could be better.</p>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <span className="feature-icon"><ImageIcon size={20} aria-hidden="true" /></span>
            <h3>See it before you share it</h3>
            <p>Preview your link on X, LinkedIn, Discord, and Slack in one place.</p>
          </article>
          <article className="feature-card">
            <span className="feature-icon"><Search size={20} /></span>
            <h3>Find what search engines miss</h3>
            <p>Check titles, descriptions, canonical URLs, and the details behind your social cards.</p>
          </article>
          <article className="feature-card">
            <span className="feature-icon"><Check size={20} /></span>
            <h3>Know what to fix next</h3>
            <p>Get a clear health score and practical recommendations, not just a pile of tags.</p>
          </article>
          <article className="feature-card">
            <span className="feature-icon"><Share2 size={20} /></span>
            <h3>Refresh stale previews</h3>
            <p>Open official platform inspectors and create a cache-busted test URL.</p>
          </article>
        </div>
      </section>

      <section className="checks-section">
        <div>
          <p className="eyebrow">THE ESSENTIALS, CHECKED</p>
          <h2>Small details.<br /><em>Big difference.</em></h2>
        </div>
        <ul className="check-list">
          {checks.map((check) => <li key={check}><Check size={17} />{check}</li>)}
        </ul>
      </section>

      <section className="faq-section">
        <p className="eyebrow">GOOD TO KNOW</p>
        <h2>Frequently asked <em>questions.</em></h2>
        <div className="faq-grid">
          <article><h3>What does this tool check?</h3><p>It fetches a public page and reviews its Open Graph, X card, title, description, image, canonical URL, and favicon metadata.</p></article>
          <article><h3>Does this guarantee a perfect preview?</h3><p>No. Platforms can cache previews, apply their own rules, and render differently. Use the preview as a guide and confirm with each platform’s inspector.</p></article>
          <article><h3>Is my page stored?</h3><p>Inspection results are held in your browser for the current session. No account is needed to use the checker.</p></article>
          <article><h3>How do I improve my social cards?</h3><p>Add descriptive Open Graph title, description, and image tags to your page. A 1200 × 630 image is a strong general-purpose starting point.</p></article>
        </div>
      </section>

      <footer className="site-footer">
        <Link className="brand" href="/" aria-label="OG Inspector home"><span className="brand-mark">O</span><span>OG Inspector<span className="brand-period">.</span></span></Link>
        <span>Clear previews. Better first impressions.</span>
      </footer>
    </main>
  );
}
