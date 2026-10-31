import Link from "next/link";

export const metadata = {
  title: "Cookie Policy",
  description: "Learn how OG Card Inspector uses cookies and browser storage.",
};

export default function CookiePolicyPage() {
  return (
    <main className="policy-page">
      <header className="site-header policy-header">
        <Link className="brand" href="/" aria-label="OG Inspector home">
          <span className="brand-mark">O</span>
          <span>OG Inspector<span className="brand-period">.</span></span>
        </Link>
        <Link className="header-link" href="/">Back to inspector <span aria-hidden="true">↗</span></Link>
      </header>
      <article className="policy-content">
        <p className="eyebrow">THE SMALL PRINT, MADE SIMPLE</p>
        <h1>Cookie <em>policy.</em></h1>
        <p className="policy-lead">Last updated: November 1, 2026</p>
        <section>
          <h2>What we use</h2>
          <p>
            OG Card Inspector does not use advertising or analytics cookies. We use one first-party cookie to
            remember your cookie preference so we do not show the consent card on every visit.
          </p>
          <ul>
            <li><strong>og-inspector-cookie-consent</strong> — stores your selection (essential only or accept all) for up to 180 days.</li>
          </ul>
        </section>
        <section>
          <h2>Browser storage</h2>
          <p>
            Your light or dark mode preference is saved in this browser&apos;s local storage. This is not a cookie
            and is used only to remember your display setting.
          </p>
        </section>
        <section>
          <h2>Your choices</h2>
          <p>
            There are no optional tracking cookies to enable. You can change your consent preference using
            Cookie settings in the site footer, or clear this site&apos;s cookies and local storage through your
            browser settings.
          </p>
        </section>
        <p className="policy-back"><Link href="/">← Back to OG Inspector</Link></p>
      </article>
    </main>
  );
}
