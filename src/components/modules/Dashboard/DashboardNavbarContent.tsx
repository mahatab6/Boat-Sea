"use client"

import DashboardMobileMenu from "./DashboardMobileMenu"
import { UserInfo } from "@/types/user.types"
import DashboardActions from "./DashboardActions"
import { NavSection } from "@/types/dashboard.types"


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
    <div className="flex items-center justify-between w-full border-b bg-card/50 backdrop-blur-md sticky top-0 z-30 h-14 px-4 md:px-8">
      
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <DashboardMobileMenu
          userInfo={userInfo}
          navItems={navItems}
          dashboardHome={dashboardHome}
        />

        {/* Welcome Message (Desktop) */}
        <div className="hidden md:block">
          <p className="text-sm font-medium text-muted-foreground">
            Welcome back, <span className="text-foreground font-bold">{userInfo.name}</span>
          </p>
        </div>
      </div>

      
      {/* Right Side Actions */}
      <DashboardActions userInfo={userInfo} />

    </div>
  )
}

export default DashboardNavbarContent