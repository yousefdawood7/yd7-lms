"use client";

import Link from "next/link";
import DropDownUser from "@/app/(public)/_component/DropDownUser";
import ToggleTheme from "@/app/(public)/_component/ToggleTheme";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function UserNav() {
  const { data: session, isPending } = authClient.useSession();

  console.log(isPending, session);

  return (
    <div className="ml-auto">
      <aside className="flex items-center gap-3">
        <ToggleTheme />

        {isPending ? null : !session ? (
          <>
            <Button asChild className="px-4 py-6" variant={"outline"}>
              <Link href={"/login"}>Login</Link>
            </Button>

            <Button asChild className="px-4 py-6">
              <Link href={"/login"}>Get Started</Link>
            </Button>
          </>
        ) : (
          <DropDownUser
            email={session.user.email}
            name={session.user.name}
            image={session.user.image}
          />
        )}

        {}
      </aside>
    </div>
  );
}
