"use client"

import { NavSection } from "@/types/dashboardtypes"
import DashboardMobileMenu from "./DashboardMobileMenu"
import { UserInfo } from "@/types/user.types"
import DashboardActions from "./DashboardActions"


interface DashboardNavbarContentProps {
  userInfo: UserInfo
  navItems: NavSection[]
  dashboardHome: string
}

const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome
}: DashboardNavbarContentProps) => {

  return (
    <div className="flex items-center justify-end gap-3 w-full border-b py-3.5 px-3">

      {/* Mobile Menu */}
      <DashboardMobileMenu
        userInfo={userInfo}
        navItems={navItems}
        dashboardHome={dashboardHome}
      />

      
      {/* Right Side */}
      <DashboardActions userInfo={userInfo} />

    </div>
  )
}

export default DashboardNavbarContent