---
name: api-to-prisma-db
description: >-
  Convert a ProfileSuite site from fetching data via REST API endpoints
  (Getprofilebydomain, Updateviewsbydomain) to querying the MySQL database
  directly with Prisma ORM. Use when the user wants to remove API calls,
  replace fetch-based data loading with Prisma, or migrate a ProfileSuite
  landing site to direct DB access.
---

# API-to-Prisma DB Migration

Convert a ProfileSuite site that calls external API endpoints into one that
queries the shared MySQL database directly via Prisma ORM — eliminating API
latency, API keys, and external dependencies.

## Reference Architecture

The target architecture (already proven in `profilesuite-entrepreneurs`):

```
.env
├── DATABASE_URL=mysql://user:pass@host:3306/profiles_builder
└── NEXT_PUBLIC_S3_URL=https://profilesuite-assets.s3.us-west-2.amazonaws.com

prisma/schema.prisma   ← shared schema (MySQL)
lib/db.ts              ← PrismaClient singleton
lib/get-featured-profiles.ts  ← DB query functions
lib/utils/image-helper.ts     ← S3 URL resolver
app/(home)/page.tsx    ← Server Component calling DB directly
```

## Migration Steps

### 1. Install Prisma

```bash
npm install @prisma/client prisma
```

Add to `package.json` scripts:
```json
{
  "build": "prisma generate && next build",
  "postinstall": "prisma generate"
}
```

### 2. Set up environment variables

Replace API-key env vars:

```diff
- UPDATE_PROFILE=https://www.profilesuite.com/api/Updateviewsbydomain?api_key=...
- GET_PROFILE=https://www.profilesuite.com/api/Getprofilebydomain?api_key=...
+ DATABASE_URL=mysql://user:pass@referrals2025.cyh3tjizziz6.us-west-2.rds.amazonaws.com:3306/profiles_builder
+ NEXT_PUBLIC_S3_URL=https://profilesuite-assets.s3.us-west-2.amazonaws.com
```

### 3. Create Prisma schema

Create `prisma/schema.prisma` with the shared ProfileSuite tables:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Member {
  id              Int       @id @default(autoincrement())
  email           String    @unique @db.VarChar(255)
  password        String    @db.VarChar(255)
  approved        Boolean   @default(false)
  signupDate      DateTime  @default(now()) @map("signup_date")
  lastLogin       DateTime? @map("last_login")
  planId          Int?      @map("plan_id")
  planExpiration  DateTime? @map("plan_expiration")
  socialId        String?   @db.VarChar(255) @map("social_id")

  profiles MemberProfile[]
  domains  ProfileDomain[]

  @@index([email])
  @@index([planId])
  @@map("members")
}

model Category {
  id                    Int     @id @default(autoincrement())
  categoryName          String  @map("category_name") @db.VarChar(255)
  folder                String? @db.VarChar(255)
  defaultDomain         String? @map("default_domain") @db.VarChar(255)

  profiles MemberProfile[]

  @@map("categories")
}

model MemberProfile {
  id                      Int     @id @default(autoincrement())
  memberId                Int     @map("member_id")
  categoryId              Int     @map("category_id")
  frameworkId             Int?    @map("framework_id")
  name                    String? @db.VarChar(255)
  artistName              String? @map("artist_name") @db.VarChar(255)
  modelName               String? @map("model_name") @db.VarChar(255)
  profileImage            String? @map("profile_image") @db.VarChar(255)
  slogan                  String? @db.Text
  discography             String? @db.Text
  introduction            String? @db.Text
  affiliations            String? @db.Text
  mediaQuotes             String? @map("media_quotes") @db.Text
  achievements            String? @db.Text
  languages               String? @db.VarChar(255)
  location                String? @db.VarChar(255)
  hometown                String? @db.VarChar(255)
  professionalCategoryId  Int?    @map("professional_category_id")
  sportsName              String? @map("sports_name") @db.VarChar(255)
  dateOfBirth             DateTime? @map("date_of_birth") @db.Date

  member   Member   @relation(fields: [memberId], references: [id], onDelete: Cascade)
  category Category @relation(fields: [categoryId], references: [id])

  @@index([memberId])
  @@index([categoryId])
  @@index([name])
  @@map("member_profile")
}

model ProfileDomain {
  id           Int     @id @default(autoincrement())
  memberId     Int     @map("member_id")
  domain       String  @db.VarChar(255)
  subdomain    String  @db.VarChar(255)
  isBuilt      Boolean @default(false) @map("is_built")

  member Member @relation(fields: [memberId], references: [id], onDelete: Cascade)

  @@index([memberId])
  @@map("profile_domains")
}
```

Then generate the client:
```bash
npx prisma generate
```

### 4. Create the Prisma singleton

Create `lib/db.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
}

export const prisma: PrismaClient =
  process.env.NODE_ENV === 'production'
    ? (globalForPrisma.prisma ??= createPrismaClient())
    : (() => {
        void globalForPrisma.prisma?.$disconnect().catch(() => {});
        const next = createPrismaClient();
        globalForPrisma.prisma = next;
        return next;
      })();

export default prisma;
```

### 5. Create the S3 image helper

Create `lib/utils/image-helper.ts`:

```typescript
export const S3_BASE_URL = (
  process.env.NEXT_PUBLIC_S3_URL || 'https://profilesuite-assets.s3.us-west-2.amazonaws.com'
).replace(/\/+$/, '');

const S3_PROFILES_BASE = `${S3_BASE_URL}/profiles`;

function joinOriginPath(base: string, path: string): string {
  const p = path.trim().replace(/^\/+/, '');
  return `${base}/${p}`;
}

export function normalizeRemoteImageUrl(href: string): string {
  try {
    const x = new URL(href);
    x.pathname = x.pathname.replace(/\/{2,}/g, '/');
    return x.href;
  } catch {
    return href;
  }
}

export function getProfileImageUrl(raw: string | null | undefined): string | null {
  if (!raw || !raw.trim()) return null;
  const r = raw.trim();
  if (r.startsWith('http://') || r.startsWith('https://')) {
    return normalizeRemoteImageUrl(r);
  }
  const s3Prefixes = ['profiles/', 'gallery/', 'products/', 'general/'];
  const key = r.replace(/^\/+/, '');
  if (s3Prefixes.some((p) => key.startsWith(p))) return joinOriginPath(S3_BASE_URL, key);
  return joinOriginPath(S3_PROFILES_BASE, key);
}
```

### 6. Replace API fetch calls with Prisma queries

#### GET_PROFILE (Getprofilebydomain) → Prisma query

Before (API):
```typescript
const res = await fetch(`${process.env.GET_PROFILE}&domain=${domain}`);
const data = await res.json();
```

After (Prisma):
```typescript
import { prisma } from '@/lib/db';
import { getProfileImageUrl } from '@/lib/utils/image-helper';

const profile = await prisma.memberProfile.findFirst({
  where: {
    member: {
      domains: { some: { domain } }
    }
  },
  include: { member: true, category: true },
});
```

#### UPDATE_PROFILE (Updateviewsbydomain) → Prisma mutation

Before (API):
```typescript
await fetch(`${process.env.UPDATE_PROFILE}&domain=${domain}`);
```

After (Prisma):
```typescript
import { prisma } from '@/lib/db';

await prisma.profileDomain.updateMany({
  where: { domain },
  data: { /* your update fields */ },
});
```

#### Featured profiles query

```typescript
import { prisma } from '@/lib/db';
import { getProfileImageUrl } from '@/lib/utils/image-helper';

export async function getFeaturedProfiles(limit = 4) {
  try {
    const profiles = await prisma.memberProfile.findMany({
      where: {
        AND: [
          { profileImage: { not: null } },
          { profileImage: { not: "" } },
          { name: { not: null } },
          { name: { not: "" } },
          { category: { categoryName: "Professional" } },
        ],
      },
      take: limit,
      orderBy: { id: "desc" },
    });

    return profiles.map((p) => ({
      id: p.id,
      name: p.name || "",
      profileImage: getProfileImageUrl(p.profileImage),
      introduction: p.introduction,
      location: p.location,
    }));
  } catch (err) {
    console.error("[getFeaturedProfiles] DB query failed:", err);
    return [];
  }
}
```

### 7. Use in Next.js Server Components

```typescript
// app/(home)/page.tsx
import { getFeaturedProfiles } from "@/lib/get-featured-profiles";

export const dynamic = "force-dynamic";

export default async function Home() {
  const profiles = await getFeaturedProfiles(8);
  return <YourComponent profiles={profiles} />;
}
```

## Key Principles

- **No API keys needed** — direct DB connection replaces all API auth.
- **Server Components only** — never expose DATABASE_URL to the client; all Prisma
  calls happen server-side.
- **Fail soft** — wrap DB calls in try/catch so the page renders (empty) if DB is
  unreachable during builds or outages.
- **Image paths** — the DB stores relative paths; resolve them to full S3 URLs using
  the image helper.
- **Category filtering** — adapt the `categoryName` filter to match the site's
  vertical (e.g. "Professional", "Entrepreneur", "Artist", "Athlete").

## Checklist

- [ ] `DATABASE_URL` and `NEXT_PUBLIC_S3_URL` in `.env`
- [ ] `prisma/schema.prisma` created with all needed models
- [ ] `npx prisma generate` runs successfully
- [ ] `lib/db.ts` Prisma singleton created
- [ ] `lib/utils/image-helper.ts` created
- [ ] All `fetch(GET_PROFILE...)` calls replaced with Prisma queries
- [ ] All `fetch(UPDATE_PROFILE...)` calls replaced with Prisma mutations
- [ ] API key env vars removed from `.env`
- [ ] `export const dynamic = "force-dynamic"` on pages needing live data
- [ ] Build succeeds with `npm run build`
