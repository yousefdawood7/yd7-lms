"use client";

import { useTransition } from "react";
import { FaGithub as GithubLogo } from "react-icons/fa";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useSpinDelay } from "spin-delay";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

async function handleSignIn() {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: "/",

    fetchOptions: {
      onSuccess: () => {
        toast.success("You signed in successfully");
      },

      onError: (error) => {
        console.log(error.error.message);
        toast.error("Something went wrong while signing you in");
      },
    },
  });
}

export default function GithubLogin() {
  const [isTransitionPending, startTransition] = useTransition();
  const isPending = useSpinDelay(isTransitionPending, {
    delay: 200,
    minDuration: 250,
  });

  return (
    <Button
      className="space-x-2.5 text-lg font-semibold"
      variant={"outline"}
      onClick={() => {
        startTransition(async () => {
          await handleSignIn();
        });
      }}
    >
      {isPending ? (
        <>
          <LoaderCircle className="animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          <GithubLogo />
          <span>Sign in with GitHub</span>
        </>
      )}
    </Button>
  );
}
