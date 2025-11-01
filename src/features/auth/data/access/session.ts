import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // prettier-ignore
  if(!session)
    return null

  return session;
}
