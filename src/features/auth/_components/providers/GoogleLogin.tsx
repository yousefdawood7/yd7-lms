"use client";

import { useEffect, useState, useTransition } from "react";
import { FaGoogle as GoogleLogo } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useSpinDelay } from "spin-delay";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

async function handleSignIn() {
  await authClient.signIn.social({
    provider: "google",
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

const useGoogle = function () {
  const [isOneTapPending, setIsOneTapPending] = useState<boolean>(false);
  const isPending = useSpinDelay(isOneTapPending, {
    delay: 200,
    minDuration: 250,
  });

  const router = useRouter();

  useEffect(() => {
    async function handleGoogleOneTap() {
      await authClient.oneTap({
        fetchOptions: {
          onRequest: () => {
            setIsOneTapPending(true);
          },
          onSuccess: () => {
            router.push("/");
            toast.success("You signed in successfully");
            setIsOneTapPending(false);
          },
          onError: (error) => {
            console.error(error.error.message);
            toast.error("Something went wrong while signing you in");
            setIsOneTapPending(false);
          },
        },
      });
    }

    handleGoogleOneTap();
  }, [router]);

  return isPending;
};

export default function GoogleLogin() {
  const [isTransitionPending, startTransition] = useTransition();
  const isOneTapPending = useGoogle();

  const isPending = useSpinDelay(isTransitionPending, {
    delay: 200,
    minDuration: 250,
  });

  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await handleSignIn();
        });
      }}
      className="space-x-2.5 text-lg font-semibold"
      variant={"outline"}
      disabled={isPending || isOneTapPending}
    >
      {isPending || isOneTapPending ? (
        <>
          <LoaderCircle className="animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          <GoogleLogo />
          <span>Sign in with Google</span>
        </>
      )}
    </Button>
  );
}
