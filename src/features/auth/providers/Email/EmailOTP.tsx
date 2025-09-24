"use client";

import { startTransition, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useSpinDelay } from "spin-delay";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";

export default function EmailOTP({ email }: { email: string }) {
  const [isTransitioning, startTransition] = useTransition();
  const [OTP, setOTP] = useState<string>("");
  const router = useRouter();

  const isPending = useSpinDelay(isTransitioning, {
    delay: 300,
    minDuration: 350,
  });

  function handleVerifyOTP() {
    startTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp: OTP,

        fetchOptions: {
          onSuccess: () => {
            router.replace("/");
            toast.success("You signed in successfully");
          },

          onError: (error) => {
            console.log(error.error.message);
            toast.error(
              error.error.message === "Invalid OTP"
                ? "Invalid OTP"
                : "Something went wrong while signing you in",
            );
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Please check your email
        </CardTitle>
        <CardDescription className="text-center text-lg">
          We have sent a 6-digit verification code to{" "}
          <span className="font-medium">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-y-5.5">
        <InputOTP maxLength={6} value={OTP} onChange={setOTP}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>
      <CardFooter className="flex flex-col justify-center gap-y-5">
        <p className="text-muted-foreground">
          Please Enter 6-digit verification code
        </p>

        <Button
          className="w-full text-lg font-semibold"
          onClick={handleVerifyOTP}
          disabled={isPending || OTP.length !== 6}
        >
          {isPending ? (
            <>
              <LoaderCircle className="animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            "Verify Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
