"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { useSpinDelay } from "spin-delay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function EmailForm() {
  const [email, setEmail] = useState<string>("");
  const [isTransitionPending, startTransition] = useTransition();
  const isPending = useSpinDelay(isTransitionPending, {
    delay: 300,
    minDuration: 350,
  });

  const router = useRouter();

  function handleSignIn() {
    startTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",

        fetchOptions: {
          onSuccess: () => {
            toast.success("6-digit code sent to your email successfully");
            router.push(`/verify-email?email=${email}`);
          },

          onError: (error) => {
            console.log(error.error.message);
            toast.error(
              error.error.message === "Invalid email"
                ? "Invalid email address"
                : "Something went wrong while signing you in",
            );
          },
        },
      });
    });
  }

  return (
    <>
      <p className="text-xl font-semibold">Email</p>
      <Input
        placeholder="me@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button
        onClick={handleSignIn}
        className="font-semibold tracking-tight transition-opacity"
        disabled={isPending || !email}
      >
        {isPending ? (
          <>
            <LoaderCircle className="animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            <Send />
            <span>Continue with Email</span>
          </>
        )}
      </Button>
    </>
  );
}
