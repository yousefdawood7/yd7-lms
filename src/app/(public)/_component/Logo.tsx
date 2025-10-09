import Image from "next/image";
import Link from "next/link";
import HeaderLogo from "public/header-logo.png";
import { cn } from "@/lib/utils";

type LogoProps = {
  logoStyles?: string;
  nameStyles?: string;
  isSidebar?: boolean;
};

export default function Logo({ logoStyles, nameStyles, isSidebar }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src={HeaderLogo}
        className={cn("bg-primary rounded-lg p-1.5", logoStyles)}
        alt="Logo"
        width={60}
        height={60}
      />
      <span
        className={cn(
          "hidden text-2xl font-semibold md:inline-block",
          nameStyles,
          `${isSidebar && "inline-block"}`,
        )}
      >
        YD7 EDUCATION
      </span>
    </Link>
  );
}
