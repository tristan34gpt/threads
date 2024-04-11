import { hasCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
  let isAuthenticated = false;

  // check if is invited user
  if (hasCookie("guest", { cookies })) {
    isAuthenticated = true;
  }
  // check if connected
  if (hasCookie("__Secure-next-auth.session-token", { cookies })) {
    isAuthenticated = true;
  }
  if (!isAuthenticated) {
    // check if isAuthenticated
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
