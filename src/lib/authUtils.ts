export type UserRole = "SUPER_ADMIN" | "ADMIN" | "BOAT_OWNER" | "CUSTOMER";

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export const isAuthRoute = (pathname: string) => {
  return authRoutes.includes(pathname);
};

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

/**
 * 1. COMMON ROUTES
 * Accessible by any authenticated user
 */
export const commonProtectedRoutes: RouteConfig = {
  exact: [
    "/dashboard/profile", 
    "/dashboard/change-password"
  ],
  pattern: [/^\/dashboard$/], // Matches the base dashboard landing
};

/**
 * 2. ADMIN & SUPER_ADMIN ROUTES
 * Matches all paths starting with /dashboard/admin
 */
export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [
    /^\/dashboard\/admin(\/.*)?$/ 
  ],
};

/**
 * 3. BOAT OWNER ROUTES
 * Matches all paths starting with /dashboard/owner
 */
export const ownerProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [
    /^\/dashboard\/owner(\/.*)?$/
  ],
};

/**
 * 4. CUSTOMER ROUTES
 * Matches all paths starting with /dashboard/customer
 */
export const customerProtectedRoutes: RouteConfig = {
  exact: ["/payment/success"],
  pattern: [
    /^\/dashboard\/customer(\/.*)?$/
  ],
};

/**
 * Helper to check if a pathname matches a RouteConfig
 */
export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
};

/**
 * Identifies the intended audience of a specific URL
 */
export const getRouteOwner = (
  pathname: string,
): "ADMIN" | "BOAT_OWNER" | "CUSTOMER" | "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }

  if (isRouteMatches(pathname, ownerProtectedRoutes)) {
    return "BOAT_OWNER";
  }

  if (isRouteMatches(pathname, customerProtectedRoutes)) {
    return "CUSTOMER";
  }

  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }

  return null;
};

/**
 * Returns the default landing page after login based on role
 */
export const getDefaultDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return "/dashboard/admin";
    case "BOAT_OWNER":
      return "/dashboard/owner";
    case "CUSTOMER":
      return "/dashboard/customer";
    default:
      return "/";
  }
};


export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole,
): boolean => {
 
  const effectiveRole = role === "SUPER_ADMIN" ? "ADMIN" : role;
  
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }
 
  return routeOwner === effectiveRole;
};