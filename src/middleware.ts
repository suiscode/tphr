import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/utils";

export const middleware = async (req: NextRequest) => {
  const requestedUrl = new URL(req.url);
  const token = req.cookies.get("cookie")?.value;

  if (requestedUrl.pathname === "/profile" && !token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  const isAdmin =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err);
    }));
  if (requestedUrl.pathname === "/admin" && !isAdmin) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

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
  matcher: ["/", "/profile", "/admin", "/auth/signin", "/auth/signup"],
};
