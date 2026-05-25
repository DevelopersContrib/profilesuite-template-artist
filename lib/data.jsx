import { headers } from "next/headers";
import prisma from "./db";
import { getProfileImageUrl, getGalleryImageUrl } from "./utils/image-helper";

const DOMAIN = process.env.NEXT_PUBLIC_VERCEL_URL;

export async function getDomain() {
  try {
    const headersList = await headers();
    const referrer = headersList.get("host");
    const domainName = referrer?.includes("localhost")
      ? DOMAIN || "localhost"
      : referrer?.replace("www.", "") || "localhost";
    return domainName;
  } catch (err) {
    console.warn("[getDomain] Failed to resolve host:", err?.message || err);
    return DOMAIN || "localhost";
  }
}

/**
 * Generous sample fallback so the redesigned UI looks intentional and
 * complete when the database is unreachable (offline dev, VPN required,
 * RDS down, etc.) instead of rendering an empty shell.
 */
const FALLBACK_PROFILE = {
  data: {
    profile: {
      name: "Ericka Celestine B. Clemente",
      artist_name: "Celestine",
      introduction:
        "I work between light and silence — collecting the quiet hours, the spilled colors, and the rooms that only exist for a moment. Each piece is an attempt to slow time enough to look at it.",
      slogan: "Visual studies in light, restraint, and the in-between.",
      profile_image: "https://picsum.photos/seed/celestine-portrait/1200/1600",
      photo: "https://picsum.photos/seed/celestine-portrait/1200/1600",
      location: "Cebu City, Philippines",
      hometown: "Bohol",
      languages: "English · Filipino · Cebuano",
      achievements:
        "Featured · GUP Magazine 2024 · LensCulture Critics' Choice 2023",
      affiliations: "Asia Society of Image Makers",
      discography: "",
      media_quotes: "",
    },
    education: [],
    experience: [
      {
        id: 1,
        location: "Manila",
        description: "Solo exhibition — 'Hours Without Names', Silverlens",
        from_date: "2024-03",
        to_date: "2024-06",
      },
      {
        id: 2,
        location: "Singapore",
        description: "Group show — 'Soft Geometries' at Gajah Gallery",
        from_date: "2023-09",
        to_date: "2023-11",
      },
      {
        id: 3,
        location: "Tokyo",
        description: "Resident artist — Kitakyushu Center for Contemporary Art",
        from_date: "2022-05",
        to_date: "2022-08",
      },
    ],
    skills: [],
    gallery: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      filename: `https://picsum.photos/seed/celestine-${i + 1}/900/${
        i % 3 === 0 ? 1200 : i % 3 === 1 ? 800 : 1000
      }`,
    })),
    links: [
      { id: 1, title: "Studio Journal", link: "https://example.com/journal" },
      { id: 2, title: "Commission Inquiries", link: "mailto:studio@example.com" },
    ],
    socials: {
      instagram: "https://instagram.com/celestine.studio",
      twitter: "",
      facebook: "",
      youtube: "",
      linkedin: "",
      pinterest: "",
      soundcloud: "",
      spotify: "",
    },
  },
};

async function findMemberIdByDomain(domain) {
  try {
    // profile_domains stores subdomain + base domain separately
    // e.g. "xavierpro.modelselect.com" → subdomain="xavierpro", domain="modelselect.com"
    const dotIndex = domain.indexOf(".");
    if (dotIndex > 0) {
      const sub = domain.slice(0, dotIndex);
      const base = domain.slice(dotIndex + 1);
      const profileDomain = await prisma.profile_domains.findFirst({
        where: { subdomain: sub, domain: base },
        select: { member_id: true, id: true },
      });
      if (profileDomain) {
        return {
          memberId: profileDomain.member_id,
          domainId: profileDomain.id,
          type: "subdomain",
        };
      }
    }

    // Fallback: check custom domains table (stores full domain)
    const customDomain = await prisma.profile_custom_domains.findFirst({
      where: { domain },
      select: { member_id: true, id: true },
    });
    if (customDomain) {
      return {
        memberId: customDomain.member_id,
        domainId: customDomain.id,
        type: "custom",
      };
    }

    return null;
  } catch (err) {
    console.warn(
      "[findMemberIdByDomain] DB lookup failed, returning null:",
      err?.message || err
    );
    return null;
  }
}

export async function getProfile() {
  const domain = await getDomain();

  const domainRecord = await findMemberIdByDomain(domain);
  if (!domainRecord) {
    console.warn(
      "[getProfile] No member found for domain (or DB unreachable):",
      domain
    );
    return FALLBACK_PROFILE;
  }

  try {
    const { memberId } = domainRecord;

    const [profile, education, experience, skills, gallery, links, social] =
      await Promise.all([
        prisma.member_profile.findFirst({ where: { member_id: memberId } }),
        prisma.profile_education.findMany({ where: { member_id: memberId } }),
        prisma.profile_experience.findMany({ where: { member_id: memberId } }),
        prisma.profile_skills.findMany({ where: { member_id: memberId } }),
        prisma.profile_gallery.findMany({ where: { member_id: memberId } }),
        prisma.profile_links.findMany({ where: { member_id: memberId } }),
        prisma.profile_social.findFirst({ where: { member_id: memberId } }),
      ]);

    if (!profile) {
      console.warn("[getProfile] No profile found for member_id:", memberId);
      return FALLBACK_PROFILE;
    }

    return {
      data: {
        profile: {
          name: profile.name || "",
          artist_name: profile.artist_name || "",
          introduction: profile.introduction || "",
          slogan: profile.slogan || "",
          profile_image: getProfileImageUrl(profile.profile_image) || "",
          photo: getProfileImageUrl(profile.profile_image) || "",
          location: profile.location || "",
          hometown: profile.hometown || "",
          discography: profile.discography || "",
          affiliations: profile.affiliations || "",
          media_quotes: profile.media_quotes || "",
          achievements: profile.achievements || "",
          languages: profile.languages || "",
        },
        education: education.map((e) => ({
          id: e.id,
          school: e.school,
          location: e.location,
          description: e.description || "",
          from_date: e.from_date,
          to_date: e.to_date,
        })),
        experience: experience.map((e) => ({
          id: e.id,
          location: e.location,
          description: e.description || "",
          from_date: e.from_date,
          to_date: e.to_date,
        })),
        skills: skills.map((s) => ({
          id: s.id,
          skill: s.skill,
        })),
        gallery: gallery.map((g) => ({
          id: g.id,
          filename: getGalleryImageUrl(g.filename) || "",
        })),
        links: links.map((l) => ({
          id: l.id,
          title: l.title,
          link: l.link,
        })),
        socials: social
          ? {
              facebook: social.facebook || "",
              instagram: social.instagram || "",
              twitter: social.twitter || "",
              soundcloud: social.soundcloud || "",
              youtube: social.youtube || "",
              pinterest: social.pinterest || "",
              linkedin: social.linkedin || "",
              spotify: social.spotify || "",
            }
          : {},
      },
    };
  } catch (err) {
    console.warn("[getProfile] DB query failed:", err?.message || err);
    return FALLBACK_PROFILE;
  }
}

export async function updateProfile() {
  const domain = await getDomain();

  const domainRecord = await findMemberIdByDomain(domain);
  if (!domainRecord) {
    // Silent return — already warned in findMemberIdByDomain.
    return {};
  }

  try {
    const today = new Date().toISOString().slice(0, 10);

    if (domainRecord.type === "custom") {
      await prisma.$executeRaw`
        INSERT INTO custom_website_views (domain_id, date, views)
        VALUES (${domainRecord.domainId}, ${today}, 1)
        ON DUPLICATE KEY UPDATE views = views + 1
      `;
    } else {
      await prisma.$executeRaw`
        INSERT INTO website_views (profile_domain_id, date, views)
        VALUES (${domainRecord.domainId}, ${today}, 1)
        ON DUPLICATE KEY UPDATE views = views + 1
      `;
    }

    return { success: true };
  } catch (err) {
    console.warn("[updateProfile] View counter update failed:", err?.message || err);
    return {};
  }
}
