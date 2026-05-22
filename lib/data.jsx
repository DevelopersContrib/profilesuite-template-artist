import { headers } from "next/headers";
import prisma from "./db";
import { getProfileImageUrl, getGalleryImageUrl } from "./utils/image-helper";

const DOMAIN = process.env.NEXT_PUBLIC_VERCEL_URL;

export async function getDomain() {
  const headersList = await headers();
  const referrer = headersList.get("host");
  const domainName = referrer?.includes("localhost")
    ? DOMAIN || "localhost"
    : referrer?.replace("www.", "") || "localhost";
  return domainName;
}

const FALLBACK_PROFILE = {
  data: {
    profile: { name: "", introduction: "", slogan: "", photo: "", profile_image: "" },
    education: [],
    experience: [],
    skills: [],
    gallery: [],
    links: [],
    socials: {},
  },
};

async function findMemberIdByDomain(domain) {
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
    if (profileDomain) return { memberId: profileDomain.member_id, domainId: profileDomain.id, type: "subdomain" };
  }

  // Fallback: check custom domains table (stores full domain)
  const customDomain = await prisma.profile_custom_domains.findFirst({
    where: { domain },
    select: { member_id: true, id: true },
  });
  if (customDomain) return { memberId: customDomain.member_id, domainId: customDomain.id, type: "custom" };

  return null;
}

export async function getProfile() {
  const domain = await getDomain();

  try {
    const domainRecord = await findMemberIdByDomain(domain);
    if (!domainRecord) {
      console.warn("[getProfile] No member found for domain:", domain);
      return FALLBACK_PROFILE;
    }

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
    console.error("[getProfile] DB query failed:", err);
    return FALLBACK_PROFILE;
  }
}

export async function updateProfile() {
  const domain = await getDomain();

  try {
    const domainRecord = await findMemberIdByDomain(domain);
    if (!domainRecord) {
      console.warn("[updateProfile] No member found for domain:", domain);
      return {};
    }

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
    console.error("[updateProfile] DB update failed:", err);
    return {};
  }
}
