import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

async function main() {
  console.log("Pushing schema to Turso...");
  
  // Create Registration table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS "Registration" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "fullName" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS "Registration_email_key" ON "Registration"("email");`);

  // Create Admin table
  await client.execute(`
    CREATE TABLE IF NOT EXISTS "Admin" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "email" TEXT NOT NULL,
      "password" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS "Admin_email_key" ON "Admin"("email");`);

  console.log("✅ Schema successfully pushed to Turso!");
}

main().catch(console.error);
