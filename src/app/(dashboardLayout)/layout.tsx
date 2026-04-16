
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar"
import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar"
import { getUserInfo } from "@/services/auth.services";


import React from "react"

export const dynamic = 'force-dynamic';

const RootDashboardLayout = async ({children} : {children: React.ReactNode}) => {
  const userInfo = await getUserInfo();
  
  if (!userInfo) {
    redirect('/login');
  }
  return (
    <div className="flex h-screen overflow-hidden">
        {/* Dashboard sidebar */}
        <DashboardSidebar/>

        <div className="flex flex-1 flex-col overflow-hidden">
          {/* DashboardNavbar */}
          <DashboardNavbar/>
           
          {/* DashboardContent */}
          <main className="flex-1 overflow-auto bg-muted/10 p-4 md:p-6">
            <div>
              {children}
            </div>
          </main>

        </div>
    </div>
  )
}

export default RootDashboardLayout