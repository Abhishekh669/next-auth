import NextAuth from "next-auth";
// import { authConfig } from './auth.config';
import { ADMIN_REDIRECT, DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from "./lib/route";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async (req, res) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isAdmin = true;
  const adminPrivateRoute  = ["/admin/settings","/admin/transactions","/admin/accounts", "/admin-login","/admin/dashboard"]
  const adminRoute  = adminPrivateRoute.includes(nextUrl.pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  if(adminRoute && !isAdmin){
    return NextResponse.redirect(new URL(ADMIN_REDIRECT, nextUrl));
  }
  if(adminRoute && isAdmin ){
    return NextResponse.redirect(new URL("/admin",nextUrl));
  }
  if (isPublicRoute && isAuthenticated   && nextUrl.pathname != "/") {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }
  if (!isAuthenticated &&  !adminRoute ) {
    return NextResponse.redirect(new URL(ROOT, nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
