"use client"

import { UserInfo } from "@/types/user.types"
import NotificationDropdown from "./NotificationDropdown"
import UserDropdown from "./UserDropdown"

interface Props {
  userInfo: UserInfo
}

const DashboardActions = ({ userInfo }: Props) => {
  return (
    <div className="flex items-center gap-2">

      {/* Notifications */}
      <NotificationDropdown />

      {/* User menu */}
      <UserDropdown userInfo={userInfo} />

    </div>
  )
}

export default DashboardActions