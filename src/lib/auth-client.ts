import { emailOTPClient, oneTapClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "./env";

export const authClient = createAuthClient({
  plugins: [
    emailOTPClient(),
    oneTapClient({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      autoSelect: false,
      cancelOnTapOutside: true,
      context: "signin",

      promptOptions: {
        baseDelay: 1000, // Base delay in ms (default: 1000)
        maxAttempts: 0, // Maximum number of attempts before triggering onPromptNotification (default: 5)
      },
    }),
  ],
});
