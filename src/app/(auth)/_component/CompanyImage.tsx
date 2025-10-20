"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import darkCompanyLogo from "public/dark-company-logo.png";
import lightCompanyLogo from "public/light-company-logo.png";

export default function CompanyImage() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { resolvedTheme: theme } = useTheme();

  const onMounting = useRef<() => void>(() => {
    setIsMounted(true);
  });

  // To Fix Hydrations mismatch
  useEffect(() => {
    onMounting.current();
  }, []);

  return (
    <Image
      className="relative -top-10 -z-1 -mb-35"
      src={theme === "light" || !isMounted ? lightCompanyLogo : darkCompanyLogo}
      alt="Company Logo"
      width={325}
      height={325}
    />
  );
}
