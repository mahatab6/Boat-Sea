/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import {
  TrendingUp,
  CalendarDays,
  Ship,
  DollarSign,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import StatsCard from "@/components/shared/statsCard";
import BoatBarChart from "@/components/shared/BarChart";
import BoatPieChart from "@/components/shared/PieChart";
import AreaChartUi from "@/components/shared/AreaChart";
import { getDashboardData } from "@/services/dashboard.services";

const BoatOwnerDashboardContent = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["boatowner-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: false,
  });

  const stats = response?.data;

  if (isLoading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Failed to load dashboard data</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Owner Dashboard
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Welcome back! Here's an overview of your boat rental business.
        </p>
      </div>

      {/* Stats Cards - Improved Layout & Colors */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Earnings"
          value={`$${(stats.totalEarnings || 0).toLocaleString()}`}
          iconName="DollarSign"
          description="Lifetime revenue from all bookings"
        />

        <StatsCard
          title="Total Bookings"
          value={stats.totalBookings || 0}
          iconName="CalendarDays"
          description="Confirmed reservations this year"
        />

        <StatsCard
          title="My Boats"
          value={stats.myBoatsCount || 0}
          iconName="Ship"
          description="Active vessels in your fleet"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Bar Chart - Bookings Trend */}
        <div className="lg:col-span-8">
          <BoatBarChart
            data={stats.barChartData}
            title="Monthly Bookings"
            description="Number of bookings received each month this year"
          />
        </div>

        {/* Pie Chart - Booking Status */}
        <div className="lg:col-span-4">
          <BoatPieChart
            data={stats.piChartData}
            title="Booking Status"
            description="Distribution of booking states"
          />
        </div>
      </div>

      {/* Area Chart - Revenue Trend */}
      <div className="lg:col-span-12">
        <AreaChartUi
          data={stats.areaChart}
          title="Revenue Trend"
          description="Monthly earnings over the past 6 months"
        />
      </div>

      {/* Quick Insights */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-emerald-600" />
          <h3 className="text-xl font-semibold">Quick Insights</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="flex gap-4">
            <div className="text-emerald-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">Highest Earning Month</p>
              <p className="text-slate-600 dark:text-slate-400">
                March 2026 — $12,450
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-blue-600">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">Most Popular Boat</p>
              <p className="text-slate-600 dark:text-slate-400">
                Luxury Yacht "Ocean King"
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-amber-600">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">Utilization Rate</p>
              <p className="text-slate-600 dark:text-slate-400">
                78% this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoatOwnerDashboardContent;
