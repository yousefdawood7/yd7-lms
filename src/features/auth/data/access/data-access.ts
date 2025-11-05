import { request } from "@arcjet/next";
import { isValidRole } from "@/features/auth/data/access/role";
import { ServerSession } from "@/lib/auth";
import { aj } from "@/utils/arcjet-rules";

type IsValidAccessReturnType =
  | { error: false; session: ServerSession; sessionID: string }
  | { error: true; message: string };

export async function isValidAccess(
  type = "create",
): Promise<IsValidAccessReturnType> {
  const adminSession = await isValidRole(["admin"]);
  const req = await request();
  const decision = await aj.protect(req, { userId: adminSession.user.id });

  if (decision.isDenied()) {
    if (decision.reason.isBot())
      return { error: true, message: `Bots are not allowed to ${type} files.` };

    if (decision.reason.isRateLimit())
      return {
        error: true,
        message: "Too many requests. Please try again later.",
      };
  }

  return {
    error: false,
    sessionID: adminSession.user.id,
    session: adminSession,
  };
}
