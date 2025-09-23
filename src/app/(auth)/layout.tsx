import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-y-5.5">
      <Link
        href={"/"}
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-5 left-5 py-5",
        })}
      >
        <ArrowLeft className="size-5" />
        <span className="text-xl">Back</span>
      </Link>

      <div className="w-full max-w-[450px]">{children}</div>
      <footer className="text-muted-foreground max-w-[386px] text-center leading-[1.5] text-balance">
        By clicking continue, you agree to our{" "}
        <span className="hover:text-primary hover:underline">
          Terms of service
        </span>{" "}
        and{" "}
        <span className="hover:text-primary hover:underline">
          Privacy Policy
        </span>
      </footer>
    </div>
  );
}
