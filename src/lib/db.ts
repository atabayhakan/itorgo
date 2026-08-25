// @ts-nocheck
// Prisma client singleton — hot-reload safe.
// Falls back to a proxy mock when @prisma/client is not yet installed
// so `next build` passes before `npm install` / `prisma generate`.

let prisma: unknown;

try {
  const { PrismaClient } = require("@prisma/client");
  const g = globalThis as unknown as { __prisma?: InstanceType<typeof PrismaClient> };
  prisma = g.__prisma ?? new PrismaClient({ log: process.env.NODE_ENV === "production" ? ["error"] : ["warn", "error"] });
  if (process.env.NODE_ENV !== "production") g.__prisma = prisma as InstanceType<typeof PrismaClient>;
} catch {
  prisma = new Proxy(
    {},
    {
      get(_, prop) {
        return new Proxy({}, { get() { throw new Error(`Prisma not installed: run \`npm install && npx prisma generate\` (missing model: ${String(prop)})`); } });
      },
    },
  );
}

export { prisma };
export default prisma;
