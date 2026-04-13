"use client";

import BoatBarChart from "@/components/shared/BarChart";
import BarChartForAdmin from "@/components/shared/BarChartForAdmin";
import LineChartUi from "@/components/shared/LineChart";
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
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        Failed to load dashboard data. Please try again.
      </div>
    );
  }

  return (
    // Main Container: Padding barano hoyeche (p-4 md:p-6)
    <div className="p-4 md:p-6 space-y-8 max-w-[1600px] mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, here is what is happening today.
        </p>
      </div>

      {/* Stats Cards: gap-4 theke gap-6 kora hoyeche better breathing space er jonno */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
          iconName="DollarSign"
          description="Total earnings to date"
          className="border-l-4 border-l-green-500 shadow-sm"
        />

        <StatsCard
          title="Total Bookings"
          value={stats?.totalBookings || 0}
          iconName="CalendarDays"
          description="All-time reservations"
          className="border-l-4 border-l-blue-500 shadow-sm"
        />

        <StatsCard
          title="Total Boats"
          value={stats?.totalBoats || 0}
          iconName="Ship" 
          description="Active fleet size"
          className="border-l-4 border-l-orange-500 shadow-sm"
        />

        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          iconName="Users"
          description="Registered accounts"
          className="border-l-4 border-l-purple-500 shadow-sm"
        />
      </div>

      {/* Line Chart Section: Single row layout with margin bottom */}
      <div className="w-full shadow-sm rounded-xl overflow-hidden border border-gray-100">
        <LineChartUi
          data={stats?.lineChart}
          title="Your Bookings Earnings"
          description="Showing earnings bookings for the current day"
        />
      </div>

      {/* Bottom Grid: Bar Chart and Pie Chart with gap-6 */}
      <div className="grid gap-6 lg:grid-cols-7 items-start">
        <div className="lg:col-span-4 shadow-sm rounded-xl border border-gray-100">
          <BarChartForAdmin
            data={stats?.barChartData}
            title="Your Bookings"
            description="Showing total bookings for the current year"
          />
        </div>

        <div className="lg:col-span-3 shadow-sm rounded-xl border border-gray-100 h-full">
          <BoatPieChart 
            data={stats?.piChartData} 
            title="Booking Status" 
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;