import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin/dashboard
  if (pathname.startsWith("/admin/dashboard")) {
    const token = req.cookies.get("admin_token")?.value;
    if (!token || !(await verifyToken(token))) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // Redirect logged-in admin away from login page
  if (pathname === "/admin") {
    const token = req.cookies.get("admin_token")?.value;
    if (token && (await verifyToken(token))) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/dashboard/:path*"],
};
