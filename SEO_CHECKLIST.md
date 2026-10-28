# SEO checklist

Use this before launch and repeat the production checks after significant releases. This site is primarily a single-page web tool, so keep its homepage focused on the tool's real purpose and avoid creating thin pages just to target keywords.

## Already in place

- [x] Server-render the homepage and keep the interactive inspector as a client component.
- [x] Provide a descriptive page title, meta description, canonical URL when the public origin is configured, and social sharing metadata.
- [x] Generate a 1200 × 630 Open Graph image.
- [x] Expose `robots.txt` and a sitemap containing the homepage.
- [x] Add WebApplication structured data that matches the free tool.
- [x] Use semantic headings, descriptive page copy, and a responsive layout.

## Before launch

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin; verify the canonical URL, Open Graph URL, sitemap URL, and robots sitemap all use that exact host.
- [ ] Verify the homepage returns `200`, renders useful HTML without JavaScript, and has exactly one descriptive `<h1>`.
- [ ] Check the title and meta description in the rendered HTML; make them unique, accurate, and compelling in search results.
- [ ] Confirm the page is indexable: no accidental `noindex`, blocked assets, authentication wall, or disallow rule.
- [ ] Validate `robots.txt`, `sitemap.xml`, canonical tags, manifest, and generated Open Graph image from the production domain.
- [ ] Validate JSON-LD with Google's Rich Results Test or Schema Markup Validator; ensure it describes visible, accurate app content and has no syntax errors.
- [ ] Preview a production URL with X, LinkedIn, Discord, and Slack tools; verify image availability, dimensions, title, and description.
- [ ] Check mobile usability, keyboard navigation, color contrast, labels, focus visibility, and reduced-motion behavior.
- [ ] Test Core Web Vitals on representative mobile and desktop connections; resolve any poor LCP, INP, or CLS results.
- [ ] Confirm all public assets use HTTPS, load successfully, and have appropriate cache headers.
- [ ] Add a privacy policy and explain data handling before enabling email collection, analytics, or other tracking.

## Content and discoverability

- [ ] Explain the tool's unique value, supported platforms, limitations, and how to use it in original, helpful page copy.
- [ ] Add concise, accurate answers to real user questions; avoid repetitive or keyword-stuffed copy.
- [ ] Use descriptive link text and ensure every important page is reachable through normal HTML links.
- [ ] If adding feature or guide pages, give each page a distinct search intent, useful original content, title, description, canonical URL, and sitemap entry.
- [ ] Keep claims, supported-platform details, screenshots, and examples current.
- [ ] Use image alt text for meaningful images; use empty alt text for purely decorative images.

## Measurement and maintenance

- [ ] Verify the domain in Google Search Console and Bing Webmaster Tools.
- [ ] Submit the production sitemap and inspect the homepage for indexing or canonicalization issues.
- [ ] Add privacy-conscious analytics only if needed, document it, and obtain consent where required.
- [ ] Monitor Search Console indexing, crawl errors, Core Web Vitals, and real user feedback after launch.
- [ ] Re-test metadata previews and structured data after significant changes; remove stale pages from the sitemap.
