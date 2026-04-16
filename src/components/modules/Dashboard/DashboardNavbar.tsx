import { getDefaultDashboardRoute } from "@/lib/authUtils";

import { getUserInfo } from "@/services/auth.services"

import { getNavItemsByRole } from "@/lib/navItems";

import DashboardNavbarContent from "./DashboardNavbarContent";
import { NavSection } from "@/types/dashboard.types";



const DashboardNavbar = async () => {

    const userInfo = await getUserInfo();
    if (!userInfo) return null;
    
    const navItems : NavSection[] = getNavItemsByRole(userInfo.role)
  
    const dashboardHome = getDefaultDashboardRoute(userInfo.role)

    return (
   
      <DashboardNavbarContent userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome}/>
  )
}

export default DashboardNavbar