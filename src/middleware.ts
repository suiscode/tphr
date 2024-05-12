import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/verify";

export const middleware = async (req: NextRequest) => {
  const requestedUrl = new URL(req.url);
  const token = req.cookies.get("cookie")?.value;

  if (requestedUrl.pathname.startsWith("/profile") && !token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  const isAdmin =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err);
    }));
  if (requestedUrl.pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }
  console.log(isAdmin);

  if (
    (requestedUrl.pathname === "/auth/signin" ||
      requestedUrl.pathname === "/auth/signup") &&
    token
  ) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/",
    "/profile",
    "/profile/changepassword",
    "/admin",
    "/admin/cvlist",
    "/auth/signin",
    "/auth/signup",
  ],
};
