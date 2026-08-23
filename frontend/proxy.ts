import { NextResponse } from "next/server";


export function proxy() {
  // Auth cookies belong to the API origin, so Vercel cannot inspect them here.
  return NextResponse.next();
}


// =================================
// MATCHER
// =================================

export const config = {

  matcher: [

    /*
     * Dashboard routes
     */

    "/admin/:path*",

    "/author/:path*",

    "/reader/:path*",

    "/dashboard/:path*",

    /*
     * Auth routes
     */

    "/login",

    "/register",

    "/forgot-password",

    "/reset-password",

  ],

};