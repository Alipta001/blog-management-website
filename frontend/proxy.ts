import {
  NextRequest,
  NextResponse,
} from "next/server";


export function proxy(
  request: NextRequest
) {

  const accessToken =
    request.cookies.get(
      "accessToken"
    )?.value;


  const refreshToken =
    request.cookies.get(
      "refreshToken"
    )?.value;


  const pathname =
    request.nextUrl.pathname;


  // =================================
  // PUBLIC ROUTES
  // =================================

  const publicRoutes = [

    "/login",

    "/register",

    "/forgot-password",

    "/reset-password",

  ];


  const isPublicRoute =
    publicRoutes.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(
          `${route}/`
        )
    );


  // =================================
  // LOGIN PAGE
  // =================================

  if (
    isPublicRoute
  ) {

    /*
     * If the user is already
     * authenticated, don't allow
     * them to go back to login.
     */

    if (
      accessToken ||
      refreshToken
    ) {

      return NextResponse.redirect(
        new URL(
          "/",
          request.url
        )
      );

    }


    return NextResponse.next();

  }


  // =================================
  // PROTECTED ROUTES
  // =================================

  if (
    !accessToken &&
    !refreshToken
  ) {

    const loginUrl =
      new URL(
        "/login",
        request.url
      );


    /*
     * Optional:
     * Remember where the user
     * originally wanted to go.
     */

    loginUrl.searchParams.set(
      "redirect",
      pathname
    );


    return NextResponse.redirect(
      loginUrl
    );

  }


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