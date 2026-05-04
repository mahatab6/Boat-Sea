"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { UserInfo } from "@/types/user.types"
import { toast } from "sonner"
import logoutAction from "../auth/logoutAction"
import { useRouter } from "next/navigation"

interface Props {
  userInfo: UserInfo
}

const UserDropdown = ({ userInfo }: Props) => {
  const router = useRouter();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      const response = await logoutAction();
      if (response?.success) {
        toast.success("Logged out successfully", { id: toastId });
        router.push("/");
        router.refresh();
      } else {
        toast.error("Failed to logout.", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to logout.", { id: toastId });
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleLogout}
      className="flex items-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20 hover:border-destructive/50 transition-all cursor-pointer font-medium"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  )
}

export default UserDropdown