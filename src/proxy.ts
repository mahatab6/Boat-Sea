import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";
import { isTokenExpiringSoon } from "./lib/tokenUtils";
import {
  getNewTokensWithRefreshToken,
  getUserInfo,
} from "./services/auth.services";

export async function proxy(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let decodedAccessToken = null;
    let isValidAccessToken = false;

    if (accessToken) {
      const result = jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      );
      decodedAccessToken = result?.data || null;
      isValidAccessToken = result?.success || false;
    }

    let userRole: UserRole | null = decodedAccessToken?.role ?? null;
    if (userRole === "SUPER_ADMIN") userRole = "ADMIN";

    const routerOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // 1. TOKEN REFRESH FLOW
    const shouldRefresh = accessToken && isValidAccessToken && refreshToken && (await isTokenExpiringSoon(accessToken));

    if (shouldRefresh) {
      const tokens = await getNewTokensWithRefreshToken(refreshToken);
      if (tokens && typeof tokens === "object" && "accessToken" in tokens && "refreshToken" in tokens) {

        const response = NextResponse.redirect(request.url); 
        response.cookies.set("accessToken", (tokens as { accessToken: string; refreshToken: string }).accessToken, { httpOnly: true, secure: true, sameSite: "none", path: "/" });
        response.cookies.set("refreshToken", (tokens as { accessToken: string; refreshToken: string }).refreshToken, { httpOnly: true, secure: true, sameSite: "none", path: "/" });
        return response;
      }
    }

    // 2. PUBLIC/AUTH ROUTES FOR LOGGED IN USERS
    if (isAuth && isValidAccessToken) {
      // Allow verify-email and reset-password to be accessed even if it's an auth route
      if (pathname !== "/verify-email" && pathname !== "/reset-password") {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
      }
    }

    


    if (isValidAccessToken) {
      const userInfo = await getUserInfo();
      if (userInfo) {
        if (!userInfo.emailVerified && pathname !== "/verify-email") {
          const url = new URL("/verify-email", request.url);
          url.searchParams.set("email", userInfo.email);
          return NextResponse.redirect(url);
        }
        if (userInfo.needPasswordChange && pathname !== "/reset-password") {
          const url = new URL("/reset-password", request.url);
          url.searchParams.set("email", userInfo.email);
          return NextResponse.redirect(url);
        }
      }
    }

   
    if (routerOwner && routerOwner !== "COMMON" && routerOwner !== userRole) {
      return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
    matcher : [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ]
}