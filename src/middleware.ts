import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log(request.nextUrl.pathname);
    console.log(request.nextauth.token);
    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      request.nextauth.token?.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/productlist") &&
      request.nextauth.token?.role != "admin" &&
      request.nextauth.token?.role != "manager"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/orders") &&
      request.nextauth.token?.role != "admin" &&
      request.nextauth.token?.role != "manager"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: ["/dashboard", "/allorders", "/customers", "/productlist"],
};
