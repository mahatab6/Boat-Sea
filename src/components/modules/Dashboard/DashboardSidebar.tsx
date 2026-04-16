import { getUserInfo } from "@/services/auth.services";

import { getNavItemsByRole } from "@/lib/navItems";

import { getDefaultDashboardRoute } from "@/lib/authUtils";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { NavSection } from "@/types/dashboard.types";

const DashboardSidebar = async () => {
  const userInfo = await getUserInfo();
  if (!userInfo) return null;
  
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);

  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;