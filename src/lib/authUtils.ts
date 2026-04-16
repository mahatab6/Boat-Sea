export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "BOAT_OWNER"
  | "CUSTOMER";

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export const isAuthRoute = (pathname: string) =>
  authRoutes.includes(pathname);

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

// COMMON
export const commonProtectedRoutes: RouteConfig = {
  exact: ["/dashboard/profile", "/dashboard/change-password"],
  pattern: [/^\/dashboard$/],
};

// ADMIN
export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/dashboard\/admin(\/.*)?$/],
};

// OWNER
export const ownerProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/dashboard\/owner(\/.*)?$/],
};

// CUSTOMER
export const customerProtectedRoutes: RouteConfig = {
  exact: ["/payment/success"],
  pattern: [/^\/dashboard\/customer(\/.*)?$/],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  return (
    routes.exact.includes(pathname) ||
    routes.pattern.some((p) => p.test(pathname))
  );
};

export const getRouteOwner = (
  pathname: string
): "ADMIN" | "BOAT_OWNER" | "CUSTOMER" | "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) return "ADMIN";
  if (isRouteMatches(pathname, ownerProtectedRoutes)) return "BOAT_OWNER";
  if (isRouteMatches(pathname, customerProtectedRoutes)) return "CUSTOMER";
  if (isRouteMatches(pathname, commonProtectedRoutes)) return "COMMON";

  return null;
};

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

export const isValidRedirectForRole = (pathname: string, role: UserRole): boolean => {
  const routeOwner = getRouteOwner(pathname);

  if (routeOwner === null) {
    // Public routes are valid for any role
    return true;
  }

  if (routeOwner === "COMMON") {
    // Common routes are valid for any authenticated user
    return true;
  }

  // Check if the role matches the route owner
  if (routeOwner === "ADMIN") {
    return role === "SUPER_ADMIN" || role === "ADMIN";
  }

  if (routeOwner === "BOAT_OWNER") {
    return role === "BOAT_OWNER";
  }

  if (routeOwner === "CUSTOMER") {
    return role === "CUSTOMER";
  }

  return false;
};