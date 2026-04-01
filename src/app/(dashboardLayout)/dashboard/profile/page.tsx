"use server"

import {  Mail, Phone, User } from 'lucide-react'

import { Card, CardContent } from "@/components/ui/card"

import { getUserInfo } from '@/services/auth.services'



const ProfilePage = async () => {
 const userData = await getUserInfo()
  return (
  
      <div className="max-w-2xl">
        <h2 className="text-2xl font-serif font-semibold mb-6">Profile </h2>
        
        <Card className="border-none shadow-md">
          <CardContent className="p-6 space-y-4">
            
            {/* Name Field */}
            <div className="grid grid-cols-3 gap-4 items-center py-3 border-b">
              <span className="text-muted-foreground font-medium flex items-center gap-2">
                <User className="w-4 h-4" /> Id
              </span>
              <span className="col-span-2 font-medium">
                {userData?.id || 'Not set'}
              </span>
            </div>

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

            
            <div className="grid grid-cols-3 gap-4 items-center py-3 border-b">
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