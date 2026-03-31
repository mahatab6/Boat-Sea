"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"
import { NavSection } from "@/types/dashboardtypes"
import { UserInfo } from "@/types/user.types"
import DashboardMobileSidebar from "./DashboardMobileSidebar"

interface Props {
  userInfo: UserInfo
  navItems: NavSection[]
  dashboardHome: string
}

const DashboardMobileMenu = ({ userInfo, navItems, dashboardHome }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5"/>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-0 h-full"> 
        <DashboardMobileSidebar
          userInfo={userInfo}
          navItems={navItems}
          dashboardHome={dashboardHome}
          setOpen={setOpen} 
        />
      </SheetContent>
    </Sheet>
  )
}

export default DashboardMobileMenu