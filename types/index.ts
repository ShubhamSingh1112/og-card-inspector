export interface OgMetadata {
  url: string;
  title: string;
  description: string;
  image: string;
  imageWidth?: number | null;
  imageHeight?: number | null;
  siteName: string;
  twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player' | string;
  twitterSite?: string;
  twitterCreator?: string;
  favicon?: string;
  canonicalUrl?: string;
  themeColor?: string;
  author?: string;
  type?: string;
  locale?: string;
}

export type IssueSeverity = 'good' | 'warning' | 'critical';

export interface HealthIssue {
  id: string;
  title: string;
  description: string;
  severity: IssueSeverity;
  recommendation?: string;
}

export interface HealthReport {
  score: number; // 0 - 100
  issues: HealthIssue[];
  metrics: {
    titleLength: number;
    descriptionLength: number;
    hasImage: boolean;
    imageDimensionsKnown: boolean;
    hasTwitterCard: boolean;
    hasFavicon: boolean;
    hasCanonical: boolean;
  };
}

export type PlatformType = 'all' | 'twitter' | 'linkedin' | 'discord' | 'slack';
