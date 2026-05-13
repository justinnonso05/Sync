import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter } as never);

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  await (prisma as { admin: { upsert: (args: unknown) => Promise<unknown> } }).admin.upsert({
    where: { email: "admin@justinch.dev" },
    update: {},
    create: {
      email: "admin@justinch.dev",
      password: hashedPassword,
    },
  });

  console.log("✅ Default admin seeded: admin@justinch.dev / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
