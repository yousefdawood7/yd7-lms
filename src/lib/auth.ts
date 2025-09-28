import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP, oneTap } from "better-auth/plugins";
import EmailTemplate from "@/features/emails/components/EmailTemplate";
import { PrismaClient } from "@/generated/prisma";

import { env } from "./env";
import { resend } from "./resend";

const prisma = new PrismaClient();
export const auth = betterAuth({
  plugins: [
    oneTap(), // Add the One Tap server plugin

    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          await resend.emails.send({
            from: "YD7 <onboarding@resend.dev>",
            to: [email],
            subject: "Verify your email address",
            react: EmailTemplate({ verificationCode: otp }),

            attachments: [
              {
                path: "https://gcdnb.pbrd.co/images/cH72oyhwbWiY.png?o=1", // App logo
                filename: "logo.png",
                contentId: "logo-img",
              },
            ],
          });
        }
      },
    }),
  ],

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },

    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
