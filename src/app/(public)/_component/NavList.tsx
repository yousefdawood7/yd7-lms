"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", protected: false },
  { href: "/courses", label: "Courses", protected: false },
  { href: "/dashboard", label: "Dashboard", protected: true },
] as const;

export default function NavList() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const isAdmin = session?.user.role === "admin" && !isPending;

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
          {item.protected && isAdmin ? (
            <Link href={item.href}>{item.label}</Link>
          ) : null}
          {!item.protected && <Link href={item.href}>{item.label}</Link>}
        </li>
      ))}
    </ul>
  );
}
