import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
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
