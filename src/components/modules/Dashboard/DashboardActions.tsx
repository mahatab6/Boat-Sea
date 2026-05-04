"use client"

import { UserInfo } from "@/types/user.types"

import { ModeToggle } from "@/components/shared/toggle"
import UserDropdown from "./UserDropdown"

interface Props {
  userInfo: UserInfo
}

const DashboardActions = ({ userInfo }: Props) => {
  return (
    <div className="flex items-center gap-3">
      {/* Theme Toggle */}
      <ModeToggle />
      
      {/* User menu */}
      <UserDropdown userInfo={userInfo} />
    </div>
  )
}

export default DashboardActions