import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  const pathName = request.nextUrl.pathname;

  if (session) {
    const isAdmin = session.user.role === "admin";

    if (pathName === "/login")
      return NextResponse.redirect(new URL("/", request.url));

    if (pathName.startsWith("/dashboard") && !isAdmin)
      return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (!session) {
    if (pathName.startsWith("/dashboard"))
      return NextResponse.redirect(new URL("/login", request.url));
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
