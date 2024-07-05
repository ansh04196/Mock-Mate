import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./utils/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://mock-interview_owner:3wrRBZd9EITc@ep-gentle-voice-a1gk8olt.ap-southeast-1.aws.neon.tech/mock-interview?sslmode=require',
  },
  verbose: true,
  strict: true,
});
