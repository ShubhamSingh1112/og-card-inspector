import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { OgMetadata } from '@/types';

// Guard against SSRF / private network scanning
function isPrivateOrLocalHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (
    host === 'localhost' ||
    host.endsWith('.localhost') ||
    host.endsWith('.local') ||
    host === '127.0.0.1' ||
    host === '0.0.0.0' ||
    host === '::1'
  ) {
    return true;
  }

  // IPv4 private ranges (10.x.x.x, 192.168.x.x, 172.16-31.x.x, 169.254.x.x)
  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = host.match(ipv4Regex);
  if (match) {
    const [, a, b] = match.map(Number);
    if (a === 10) return true;
    if (a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
  }

  return false;
}

function resolveUrl(urlCandidate: string | undefined, baseUrl: string): string {
  if (!urlCandidate || !urlCandidate.trim()) return '';
  const trimmed = urlCandidate.trim();
  try {
    return new URL(trimmed, baseUrl).href;
  } catch {
    return trimmed;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json(
      { success: false, error: 'Missing "url" query parameter' },
      { status: 400 }
    );
  }

  let formattedUrl = targetUrl.trim();
  if (!/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = `https://${formattedUrl}`;
  }

  let parsedBaseUrl: URL;
  try {
    parsedBaseUrl = new URL(formattedUrl);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid URL format' },
      { status: 400 }
    );
  }

  if (isPrivateOrLocalHost(parsedBaseUrl.hostname)) {
    return NextResponse.json(
      { success: false, error: 'Access to private or localhost addresses is restricted.' },
      { status: 403 }
    );
  }

  try {
    // Social bots (e.g. facebookexternalhit or Twitterbot) are granted access to public metadata
    const response = await fetch(formattedUrl, {
      headers: {
        'User-Agent':
          'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php) Twitterbot/1.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Target responded with status ${response.status} (${response.statusText})`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Parse Open Graph & Twitter meta tags
    const title =
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="twitter:title"]').attr('content') ||
      $('title').text().trim() ||
      '';

    const description =
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="twitter:description"]').attr('content') ||
      $('meta[name="description"]').attr('content') ||
      '';

    const rawImage =
      $('meta[property="og:image:secure_url"]').attr('content') ||
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image:src"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      $('meta[name="image"]').attr('content') ||
      '';

    const rawWidth = $('meta[property="og:image:width"]').attr('content');
    const rawHeight = $('meta[property="og:image:height"]').attr('content');

    const siteName =
      $('meta[property="og:site_name"]').attr('content') ||
      $('meta[name="application-name"]').attr('content') ||
      parsedBaseUrl.hostname.replace(/^www\./, '');

    const twitterCard =
      $('meta[name="twitter:card"]').attr('content')?.toLowerCase() || 'summary_large_image';

    const twitterSite = $('meta[name="twitter:site"]').attr('content') || undefined;
    const twitterCreator = $('meta[name="twitter:creator"]').attr('content') || undefined;

    const rawFavicon =
      $('link[rel="apple-touch-icon"]').attr('href') ||
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href') ||
      '/favicon.ico';

    const rawCanonical =
      $('link[rel="canonical"]').attr('href') ||
      $('meta[property="og:url"]').attr('content') ||
      formattedUrl;

    const themeColor = $('meta[name="theme-color"]').attr('content') || undefined;
    const author = $('meta[name="author"]').attr('content') || undefined;
    const type = $('meta[property="og:type"]').attr('content') || 'website';
    const locale = $('meta[property="og:locale"]').attr('content') || 'en_US';

    const finalImage = resolveUrl(rawImage, formattedUrl);
    const finalFavicon = resolveUrl(rawFavicon, formattedUrl);
    const finalCanonical = resolveUrl(rawCanonical, formattedUrl);

    const metadata: OgMetadata = {
      url: formattedUrl,
      title: title.trim(),
      description: description.trim(),
      image: finalImage,
      imageWidth: rawWidth ? parseInt(rawWidth, 10) : null,
      imageHeight: rawHeight ? parseInt(rawHeight, 10) : null,
      siteName: siteName.trim(),
      twitterCard,
      twitterSite,
      twitterCreator,
      favicon: finalFavicon,
      canonicalUrl: finalCanonical,
      themeColor,
      author,
      type,
      locale,
    };

    return NextResponse.json({
      success: true,
      data: metadata,
      timestamp: Date.now(),
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')
        ? 'Request timed out after 8 seconds. The target server may be slow or blocking requests.'
        : error instanceof Error
          ? error.message
          : 'Failed to fetch and parse URL';

    return NextResponse.json({ success: false, error: message }, { status: 502 });
  }
}
