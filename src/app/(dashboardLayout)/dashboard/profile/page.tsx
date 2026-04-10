import { Mail, Phone, User } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserInfo } from '@/services/auth.services'
import ProfileModal from './ProfileModal'


const ProfilePage = async () => {
  const userData = await getUserInfo() 

  // Get initials for fallback (e.g., "John Doe" -> "JD")
  const initials = userData?.name
    ? userData.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : 'U'

  return (
    <div className="max-w-2xl">
      {/* Header with Title and Modal on the right */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-semibold">Profile</h2>
        <ProfileModal {...userData}/>
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="p-6 space-y-4">
          
          {/* Avatar Section (Replacing ID) */}
          <div className="flex flex-col items-center pb-6 border-b">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userData?.image} alt={userData?.name || "User"} />
              <AvatarFallback className="text-xl">{initials}</AvatarFallback>
            </Avatar>
            <p className="mt-2 text-sm text-muted-foreground">Profile Picture</p>
          </div>

          {/* Name Field */}
          <div className="grid grid-cols-3 gap-4 items-center py-3 border-b">
            <span className="text-muted-foreground font-medium flex items-center gap-2">
              <User className="w-4 h-4" /> Name
            </span>
            <span className="col-span-2 font-medium">
              {userData?.name || 'Not set'}
            </span>
          </div>

          {/* Email Field */}
          <div className="grid grid-cols-3 gap-4 items-center py-3 border-b">
            <span className="text-muted-foreground font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </span>
            <span className="col-span-2">
              {userData?.email}
            </span>
          </div>

          {/* Role Field */}
          <div className="grid grid-cols-3 gap-4 items-center py-3">
            <span className="text-muted-foreground font-medium flex items-center gap-2">
              <Phone className="w-4 h-4" /> Role
            </span>
            <span className="col-span-2">
              {userData?.role || 'Not set'}
            </span>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage