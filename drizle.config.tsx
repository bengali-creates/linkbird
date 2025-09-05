import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  strict: true,
  verbose: true,
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
});
