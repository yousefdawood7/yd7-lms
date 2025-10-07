import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CompanyImage from "@/app/(auth)/_component/CompanyImage";
import { NameProvider } from "@/app/(auth)/_contexts/NameContext";
import { buttonVariants } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-y-5.5 px-2.5">
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

      <CompanyImage />

      <div className="w-full max-w-[450px]">
        <NameProvider>{children}</NameProvider>
      </div>
      <footer className="text-muted-foreground max-w-[386px] text-center leading-[1.5] text-balance">
        By clicking continue, you agree to our{" "}
        <span className="hover:text-primary cursor-pointer underline hover:underline">
          Terms of service
        </span>{" "}
        and{" "}
        <span className="hover:text-primary cursor-pointer underline hover:underline">
          Privacy Policy
        </span>
      </footer>
    </div>
  );
}
