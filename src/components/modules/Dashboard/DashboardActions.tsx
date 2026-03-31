"use client"

import { UserInfo } from "@/types/user.types"

import UserDropdown from "./UserDropdown"

interface Props {
  userInfo: UserInfo
}

const DashboardActions = ({ userInfo }: Props) => {
  return (
    <div className=" md:flex items-center gap-2 hidden">
      {/* Notifications */}
   
      {/* User menu */}
      <UserDropdown userInfo={userInfo} />

    </div>
  )
}

export default DashboardActions