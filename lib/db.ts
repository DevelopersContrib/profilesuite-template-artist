import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  return new PrismaClient({
    // Keep Prisma's own logger quiet in dev so connection errors don't
    // surface as Next.js runtime overlays. Real failures are handled
    // explicitly in lib/data.jsx with graceful fallbacks.
    log: process.env.NODE_ENV === "development" ? ["warn"] : [],
  });
}

export const prisma: PrismaClient =
  process.env.NODE_ENV === "production"
    ? (globalForPrisma.prisma ??= createPrismaClient())
    : (() => {
        void globalForPrisma.prisma?.$disconnect().catch(() => {});
        const next = createPrismaClient();
        globalForPrisma.prisma = next;
        return next;
      })();

export default prisma;
