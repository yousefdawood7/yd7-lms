import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { oneTap } from "better-auth/plugins";
import { PrismaClient } from "@/generated/prisma";

import { env } from "./env";

const prisma = new PrismaClient();
export const auth = betterAuth({
  plugins: [
    oneTap(), // Add the One Tap server plugin
  ],

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
