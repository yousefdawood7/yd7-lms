"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

export default function NavList() {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-4 sm:flex">
      {navItems.map((item) => (
        <li
          key={item.href}
          className={cn(
            pathname === item.href &&
              "rounded-lg bg-white px-4.5 py-2.5 text-zinc-800 not-dark:bg-zinc-800 not-dark:text-white",
          )}
        >
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
}
