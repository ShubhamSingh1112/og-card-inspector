export function getSiteUrl(): URL | undefined {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl = process.env.VERCEL_URL;
  const value = configuredUrl || (vercelUrl ? `https://${vercelUrl}` : undefined);
  if (!value) return undefined;

  try {
    return new URL(value);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
  }
}
