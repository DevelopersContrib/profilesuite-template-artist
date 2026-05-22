export const S3_BASE_URL = (
  process.env.NEXT_PUBLIC_S3_URL ||
  "https://profilesuite-assets.s3.us-west-2.amazonaws.com"
).replace(/\/+$/, "");

const S3_PROFILES_BASE = `${S3_BASE_URL}/profiles`;
const S3_GALLERY_BASE = `${S3_BASE_URL}/gallery`;

function joinOriginPath(base: string, path: string): string {
  const p = path.trim().replace(/^\/+/, "");
  return `${base}/${p}`;
}

export function normalizeRemoteImageUrl(href: string): string {
  try {
    const x = new URL(href);
    x.pathname = x.pathname.replace(/\/{2,}/g, "/");
    return x.href;
  } catch {
    return href;
  }
}

const USE_SAMPLE_IMAGES = process.env.USE_SAMPLE_IMAGES === "true";

function sampleProfileImage(): string {
  return "https://picsum.photos/seed/profile-hero/1200/800";
}

let galleryIndex = 0;
function sampleGalleryImage(): string {
  return `https://picsum.photos/seed/gallery-${galleryIndex++}/600/400`;
}

export function getProfileImageUrl(
  raw: string | null | undefined
): string | null {
  if (USE_SAMPLE_IMAGES) return sampleProfileImage();
  if (!raw || !raw.trim()) return null;
  const r = raw.trim();
  if (r.startsWith("http://") || r.startsWith("https://")) {
    return normalizeRemoteImageUrl(r);
  }
  const s3Prefixes = ["profiles/", "gallery/", "products/", "general/"];
  const key = r.replace(/^\/+/, "");
  if (s3Prefixes.some((p) => key.startsWith(p)))
    return joinOriginPath(S3_BASE_URL, key);
  return joinOriginPath(S3_PROFILES_BASE, key);
}

export function getGalleryImageUrl(
  raw: string | null | undefined
): string | null {
  if (USE_SAMPLE_IMAGES) return sampleGalleryImage();
  if (!raw || !raw.trim()) return null;
  const r = raw.trim();
  if (r.startsWith("http://") || r.startsWith("https://")) {
    return normalizeRemoteImageUrl(r);
  }
  const key = r.replace(/^\/+/, "");
  if (key.startsWith("gallery/")) return joinOriginPath(S3_BASE_URL, key);
  return joinOriginPath(S3_GALLERY_BASE, key);
}
