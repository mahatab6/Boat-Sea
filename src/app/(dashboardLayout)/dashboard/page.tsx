import { redirect } from "next/navigation";
import { getUserInfo } from "@/services/auth.services";
import { getDefaultDashboardRoute } from "@/lib/authUtils";


export default async function DashboardPage() {
  const user = await getUserInfo();

  if (!user) {
    redirect("/login");
  }

  const route = getDefaultDashboardRoute(user?.role);

  redirect(route);
}