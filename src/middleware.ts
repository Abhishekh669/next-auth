import NextAuth from "next-auth";
// import { authConfig } from './auth.config';
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from "./lib/route";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import { getToken } from "next-auth/jwt";


const { auth } = NextAuth(authConfig);
// console.log("this is the auth okie",auth)

export default auth(async (req, res) => {
  const { nextUrl } = req;
  // const token = await getToken({req});
  // console.log("this is the token",token)

  const isAuthenticated = !!req.auth;
  console.log("Is authenticated:", isAuthenticated);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(ROOT, nextUrl));
  }

  // Continue with the request if no redirect is needed
  return NextResponse.next();
});


export const config = {
  matcher: [
              "/dashboard/:path*",
              "/sign-in",
              // "/api(.*)"
            ],
};
