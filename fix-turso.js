const { createClient } = require('@libsql/client');
require('dotenv/config');

async function run() {
  const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN
  });
  
  await client.execute('DROP TABLE IF EXISTS Registration;');
  await client.execute('CREATE TABLE Registration (id TEXT NOT NULL PRIMARY KEY, fullName TEXT NOT NULL, email TEXT NOT NULL, createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);');
  await client.execute('CREATE UNIQUE INDEX Registration_email_key ON Registration(email);');
  
  console.log('Successfully fixed Registration table!');
}

run().catch(console.error);
