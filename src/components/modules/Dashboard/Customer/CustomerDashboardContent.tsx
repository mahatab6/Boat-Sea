"use client";

import StatsCard from '@/components/shared/statsCard';
import { getDashboardData } from '@/services/dashboard.services';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react'; // Assuming you use lucide-react
import React from 'react';

const CustomerDashboardContent = () => {
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["customer-dashboard-data"],
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
    return <div className="p-8 text-red-500">Failed to load dashboard data.</div>;
  }

  return (
    <div className="p-2 space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, here is what is happening today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        <StatsCard
          title="Total Spent"
          value={`$${(stats?.totalSpent || 0).toLocaleString()}`}
          iconName="DollarSign"
          description="Lifetime expenditure"
          className="border-l-4 border-l-green-500"
        />


        <StatsCard
          title="Total Bookings"
          value={stats?.totalBookings || 0}
          iconName="CalendarDays"
          description="All time bookings"
        />

      
        <StatsCard
          title="Active Trips"
          value={stats?.activeTripCount || 0}
          iconName="UserSquare"
          description="Currently ongoing"
        />

      </div>
    </div>
  );
};

export default CustomerDashboardContent;