import Image from "next/image";
import Link from "next/link";
import HeaderLogo from "public/header-logo.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src={HeaderLogo}
        className="bg-primary rounded-lg p-1.5"
        alt="Logo"
        width={60}
        height={60}
      />
      <span className="hidden text-2xl font-semibold md:inline-block">
        YD7 EDUCATION
      </span>
    </Link>
  );
}
