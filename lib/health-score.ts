import { OgMetadata, HealthReport, HealthIssue } from '@/types';

export function evaluateMetaHealth(metadata: OgMetadata): HealthReport {
  const issues: HealthIssue[] = [];
  let score = 100;

  const titleLen = metadata.title.trim().length;
  const descLen = metadata.description.trim().length;
  const hasImage = Boolean(metadata.image && metadata.image.trim().length > 0);
  const hasDimensions = Boolean(metadata.imageWidth && metadata.imageHeight);
  const hasTwitterCard = Boolean(metadata.twitterCard);
  const hasFavicon = Boolean(metadata.favicon);
  const hasCanonical = Boolean(metadata.canonicalUrl);

  // 1. Title Evaluation
  if (titleLen === 0) {
    score -= 25;
    issues.push({
      id: 'title-missing',
      title: 'Missing Title Tag',
      description: 'Neither <meta property="og:title"> nor <title> was detected.',
      severity: 'critical',
      recommendation: 'Add an og:title between 40-60 characters for optimal display.',
    });
  } else if (titleLen > 70) {
    score -= 10;
    issues.push({
      id: 'title-too-long',
      title: `Title is long (${titleLen} chars)`,
      description: 'Titles over 60-70 characters are truncated on mobile screens and social feeds.',
      severity: 'warning',
      recommendation: 'Aim for 40 to 60 characters to avoid clipping.',
    });
  } else if (titleLen < 20) {
    score -= 5;
    issues.push({
      id: 'title-too-short',
      title: `Title might be too short (${titleLen} chars)`,
      description: 'Short titles may lack descriptive keywords and context.',
      severity: 'warning',
      recommendation: 'Expand title to 40-60 characters explaining your product or article.',
    });
  } else {
    issues.push({
      id: 'title-optimal',
      title: `Optimal Title Length (${titleLen} chars)`,
      description: 'Your title fits within standard display constraints across major platforms.',
      severity: 'good',
    });
  }

  // 2. Description Evaluation
  if (descLen === 0) {
    score -= 20;
    issues.push({
      id: 'desc-missing',
      title: 'Missing Description',
      description: 'No og:description or standard meta description was found.',
      severity: 'critical',
      recommendation: 'Add a compelling description of 50-160 characters to boost click-throughs.',
    });
  } else if (descLen > 200) {
    score -= 10;
    issues.push({
      id: 'desc-too-long',
      title: `Description is long (${descLen} chars)`,
      description: 'Descriptions exceeding 160-200 characters are truncated on X, LinkedIn, and Discord.',
      severity: 'warning',
      recommendation: 'Keep descriptions concise (50-160 characters) with your main value proposition.',
    });
  } else if (descLen < 40) {
    score -= 5;
    issues.push({
      id: 'desc-too-short',
      title: `Description is brief (${descLen} chars)`,
      description: 'Consider adding more context to entice users to click.',
      severity: 'warning',
      recommendation: 'Target 50-160 characters for maximum CTR.',
    });
  } else {
    issues.push({
      id: 'desc-optimal',
      title: `Optimal Description Length (${descLen} chars)`,
      description: 'Length is balanced and should render completely on social feeds.',
      severity: 'good',
    });
  }

  // 3. Image Evaluation
  if (!hasImage) {
    score -= 35;
    issues.push({
      id: 'image-missing',
      title: 'No Open Graph Image Found',
      description: 'Posts without preview images receive significantly fewer clicks and impressions.',
      severity: 'critical',
      recommendation: 'Set <meta property="og:image" content="..."> with an image of 1200x630px.',
    });
  } else {
    if (hasDimensions && metadata.imageWidth && metadata.imageHeight) {
      const ratio = metadata.imageWidth / metadata.imageHeight;
      const isTargetRatio = ratio >= 1.7 && ratio <= 2.1; // ~1.91:1

      if (!isTargetRatio || metadata.imageWidth < 600) {
        score -= 8;
        issues.push({
          id: 'image-dimensions-suboptimal',
          title: `Image Dimensions: ${metadata.imageWidth}x${metadata.imageHeight}px`,
          description: 'Recommended dimension is 1200x630px (1.91:1 aspect ratio) for crisp rendering.',
          severity: 'warning',
          recommendation: 'Resize to 1200x630px to prevent cropping or pixelation.',
        });
      } else {
        issues.push({
          id: 'image-dimensions-ideal',
          title: `Great Image Dimensions (${metadata.imageWidth}x${metadata.imageHeight}px)`,
          description: 'Dimensions match the ideal 1.91:1 aspect ratio.',
          severity: 'good',
        });
      }
    } else {
      issues.push({
        id: 'image-present',
        title: 'Open Graph Image Detected',
        description: 'An image URL was found. For best reliability, also declare og:image:width & og:image:height.',
        severity: 'good',
        recommendation: 'Explicitly specify 1200x630 via og:image:width and og:image:height tags.',
      });
    }
  }

  // 4. Twitter Card Tag
  if (!hasTwitterCard) {
    score -= 10;
    issues.push({
      id: 'twitter-card-missing',
      title: 'Missing twitter:card Tag',
      description: 'Without this tag, Twitter/X may default to a small thumbnail or plain text card.',
      severity: 'warning',
      recommendation: 'Add <meta name="twitter:card" content="summary_large_image">.',
    });
  } else if (metadata.twitterCard === 'summary_large_image') {
    issues.push({
      id: 'twitter-card-large',
      title: 'Large Twitter Card Enabled',
      description: 'Configured for high-visibility summary_large_image presentation.',
      severity: 'good',
    });
  } else {
    issues.push({
      id: 'twitter-card-standard',
      title: `Twitter Card Type: ${metadata.twitterCard}`,
      description: 'Card type is explicitly declared.',
      severity: 'good',
    });
  }

  // 5. Canonical URL
  if (!hasCanonical) {
    score -= 5;
    issues.push({
      id: 'canonical-missing',
      title: 'Missing Canonical URL',
      description: 'Canonical URL helps search engines and social platforms preserve social equity.',
      severity: 'warning',
      recommendation: 'Include <link rel="canonical" href="...">.',
    });
  } else {
    issues.push({
      id: 'canonical-present',
      title: 'Canonical URL Present',
      description: metadata.canonicalUrl || 'Canonical link tag configured.',
      severity: 'good',
    });
  }

  // 6. Favicon
  if (!hasFavicon) {
    score -= 5;
    issues.push({
      id: 'favicon-missing',
      title: 'No Favicon Detected',
      description: 'Favicons display on Slack, browser tabs, and modern mobile feed notifications.',
      severity: 'warning',
    });
  }

  const normalizedScore = Math.max(0, Math.min(100, score));

  return {
    score: normalizedScore,
    issues,
    metrics: {
      titleLength: titleLen,
      descriptionLength: descLen,
      hasImage,
      imageDimensionsKnown: hasDimensions,
      hasTwitterCard,
      hasFavicon,
      hasCanonical,
    },
  };
}
