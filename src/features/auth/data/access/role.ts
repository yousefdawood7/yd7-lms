import { redirect } from "next/navigation";
import { getSession } from "@/features/auth/data/access/session";

type Roles = "admin" | "user";

export async function isValidRole(role: [Roles, ...Roles[]]) {
  const session = await getSession();

  // prettier-ignore
  if (!session)
    return redirect("/login");

  const currentRole = session.user.role;

  // prettier-ignore
  if(!role.includes(currentRole as Roles)) 
      return redirect("/unauthorized");

  return session;
}
