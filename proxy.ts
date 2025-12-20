import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(req: NextRequest) {
  const sessionCookie =
    req.cookies.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME!)?.value;

  const roleCookie =
    req.cookies.get(process.env.NEXT_PUBLIC_SESSION_COOKIE_USER_ROLE!)?.value;

  const { pathname } = req.nextUrl;

  const isLoginPage = pathname.startsWith("/login");
  const isRegisterPage = pathname.startsWith("/register");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAdminRoute = pathname.startsWith("/admin");

  // 1️⃣ Non-authenticated user trying to access protected routes
  if ((isDashboardRoute || isAdminRoute) && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2️⃣ Authenticated user visiting login/register — redirect them away
  if ((isLoginPage || isRegisterPage) && sessionCookie) {
    return NextResponse.redirect(
      new URL("/dashboard/applications", req.url)
    );
  }

  // 3️⃣ Restrict admin-only routes
  if (isAdminRoute && roleCookie !== "admin") {
    return NextResponse.redirect(
      new URL("/dashboard/applications", req.url)
    );
  }

  // 4️⃣ Otherwise allow
  return NextResponse.next();
}
