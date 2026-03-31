import { NavSection } from "@/types/dashboardtypes";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";


export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
        },
        {
          title: "My Profile",
          href: "/dashboard/profile",
          icon: "User",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/dashboard/change-password",
          icon: "Settings",
        },
      ],
    },
  ];
};


export const ownerNavItems: NavSection[] = [
  {
    title: "Fleet Management",
    items: [
      {
        title: "My Boats",
        href: "/dashboard/owner/boats",
        icon: "Ship",
      },
      {
        title: "Booking Requests",
        href: "/dashboard/owner/bookings",
        icon: "Anchor",
      },
      {
        title: "Availability Calendar",
        href: "/dashboard/owner/schedules",
        icon: "Calendar",
      },
      {
        title: "Earnings",
        href: "/dashboard/owner/earnings",
        icon: "Banknote",
      },
      {
        title: "Reviews",
        href: "/dashboard/owner/reviews",
        icon: "Star",
      },
    ],
  },
];


export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/dashboard/admin/admins-management",
        icon: "Shield",
      },
      {
        title: "Boat Owners",
        href: "/dashboard/admin/owners-management",
        icon: "Contact",
      },
      {
        title: "Customers",
        href: "/dashboard/admin/customers-management",
        icon: "Users",
      },
    ],
  },
  {
    title: "Platform Management",
    items: [
      {
        title: "All Bookings",
        href: "/dashboard/admin/bookings-management",
        icon: "ClipboardList",
      },
      {
        title: "Boat Verification",
        href: "/dashboard/admin/boat-verification",
        icon: "FileCheck",
      },
      {
        title: "Route Management",
        href: "/dashboard/admin/routes-management",
        icon: "Map",
      },
      {
        title: "Payments",
        href: "/dashboard/admin/payments-management",
        icon: "CreditCard",
      },
    ],
  },
];


export const customerNavItems: NavSection[] = [
  {
    title: "Trips",
    items: [
      {
        title: "My Bookings",
        href: "/dashboard/customer/my-bookings",
        icon: "Ticket",
      },
      {
        title: "Wishlist",
        href: "/dashboard/customer/wishlist",
        icon: "Heart",
      },
    ],
  },
  {
    title: "History",
    items: [
      {
        title: "Rental History",
        href: "/dashboard/customer/history",
        icon: "History",
      },
      {
        title: "Invoices",
        href: "/dashboard/customer/invoices",
        icon: "FileText",
      },
    ],
  },
];


export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];

    case "BOAT_OWNER":
      return [...commonNavItems, ...ownerNavItems];

    case "CUSTOMER":
      return [...commonNavItems, ...customerNavItems];
      
    default:
      return commonNavItems;
  }
};