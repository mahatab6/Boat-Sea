
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { UserInfo } from "@/types/user.types"
import { toast } from "sonner"

import { redirect } from "next/navigation"
import logoutAction from "../auth/logoutAction"
import Link from "next/link"




interface Props {
  userInfo: UserInfo
}


const handleLogout = async () => {
  const toastId = toast.loading("Logging out...");

  const response = await logoutAction();
  
  if (response?.success) {
    toast.success("Logged out successfully", { id: toastId });
    redirect("/")
  } else {
    toast.error("Failed to logout.", { id: toastId });
  }
}

const UserDropdown = ({ userInfo }: Props) => {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger>
  <Button variant="outline" size="icon" asChild className="cursor-pointer">
    <User className="w-5 h-5" />
  </Button>
</DropdownMenuTrigger>

<DropdownMenuContent align="end">

  <Link href={"/dashboard/profile"}>
    <DropdownMenuItem className="cursor-pointer">
      Profile
    </DropdownMenuItem>
  </Link>

  <DropdownMenuItem
    className="cursor-pointer"
    onClick={handleLogout}
  >
    Logout
  </DropdownMenuItem>

</DropdownMenuContent>

    </DropdownMenu>
  )
}

export default UserDropdown