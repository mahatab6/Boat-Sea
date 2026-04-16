"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SheetTitle } from "@/components/ui/sheet";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.types";

import { UserInfo } from "@/types/user.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardMobileSidebarProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
  setOpen?: (open: boolean) => void; // Added to close menu on link click
}

const DashboardMobileSidebar = ({
  userInfo,
  navItems,
  dashboardHome,
  setOpen,
}: DashboardMobileSidebarProps & { setOpen?: (open: boolean) => void }) => {
  const pathName = usePathname();

  return (
    /* IMPORTANT: h-screen and overflow-hidden on the parent 
       forces the ScrollArea to stay within the bounds of the mobile screen.
    */
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Header - Fixed */}
      <div className="flex h-16 shrink-0 items-center border-b px-6">
        <Link href={dashboardHome} onClick={() => setOpen?.(false)}>
          <span className="text-xl font-bold text-primary">HealthCare</span>
        </Link>
      </div>
      
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

      {/* Scrollable Area - The magic happens here. 
         h-full inside a flex-1 container ensures it fills the gap.
      */}
      <div className="flex-1 min-h-0"> 
        <ScrollArea className="h-full w-full">
          <nav className="space-y-6 px-3 py-6">
            {navItems.map((section, sectionId) => (
              <div key={sectionId} className="space-y-2">
                {section.title && (
                  <h4 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h4>
                )}
                <div className="space-y-1">
                  {section.items.map((item, id) => {
                    const isActive = pathName === item.href;
                    const Icon = getIconComponent(item.icon);
                    return (
                      <Link
                        href={item.href}
                        key={id}
                        onClick={() => setOpen?.(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="flex-1">{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
                {sectionId < navItems.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </div>

      {/* Footer - Fixed */}
      <div className="shrink-0 border-t p-4 bg-background">
        <div className="flex items-center gap-3 rounded-lg border p-3">
          <div className="h-9 w-9 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">
              {userInfo.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate leading-none mb-1">{userInfo.name}</p>
            <p className="text-[11px] text-muted-foreground capitalize">
              {userInfo.role.toLowerCase().replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMobileSidebar;