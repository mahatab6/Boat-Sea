"use client";

import BoatBarChart from "@/components/shared/BarChart";
import BoatPieChart from "@/components/shared/PieChart";
import StatsCard from "@/components/shared/statsCard";
import { getDashboardData } from "@/services/dashboard.services";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

const AdminDashboardContent = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: "always",
  });

  const stats = response?.data;

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500">Failed to load dashboard data.</div>
    );
  }

  return (
    <div className="p-2 space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, here is what is happening today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      
        <StatsCard
          title="Total Revenue"
          value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
          iconName="DollarSign"
          description="Total earnings to date"
          className="border-l-4 border-l-green-500"
        />

     
        <StatsCard
          title="Total Bookings"
          value={stats?.totalBookings || 0}
          iconName="CalendarDays"
          description="All-time reservations"
          className="border-l-4 border-l-blue-500"
        />

        <StatsCard
          title="Total Boats"
          value={stats?.totalBoats || 0}
          iconName="Ship" 
          description="Active fleet size"
          className="border-l-4 border-l-orange-500"
        />

        {/* Total Users - Growth metric */}
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          iconName="Users"
          description="Registered accounts"
          className="border-l-4 border-l-purple-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <div className="md:col-span-4">
          <BoatBarChart
            data={stats?.barChartData}
            title="Your Bookings"
            description="Showing total bookings for the current year"
          />
        </div>

        <div className="lg:col-span-3">
          <BoatPieChart data={stats?.piChartData} title="Booking Status" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;
