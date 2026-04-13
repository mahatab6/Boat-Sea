"use client";

import React, { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface AreaCharDataPoint {
  createdAt: string | Date;
  totalAmount: number;
}

interface AreaCharttProps {
  data?: AreaCharDataPoint[];
  title?: string;
  description?: string;
}

const revenueChartConfig = {
  amount: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const AreaChartUi = ({
  data,
  title = "Revenue Overview",
  description = "Showing total revenue for the last few days",
}: AreaCharttProps) => {
  // Data processing logic
  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    // Grouping data by Day (e.g., "Mon", "Tue")
    const earningsMap = data.reduce((acc: Record<string, number>, item) => {
      const date = new Date(item.createdAt);
      const day = date.toLocaleDateString("en-US", {
        weekday: "short",
      });

      acc[day] = (acc[day] || 0) + item.totalAmount;
      return acc;
    }, {});

    // Formatting for Recharts
    return Object.entries(earningsMap).map(([day, total]) => ({
      day: day,       // X-axis dataKey
      amount: total,  // Area and Y-axis dataKey
    }));
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[350px]">
          <p className="text-sm text-muted-foreground">No revenue data found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-2 shadow-sm border-gray-100">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ChartContainer config={revenueChartConfig} className="h-full w-full">
            <AreaChart
              data={chartData}
              margin={{ left: 12, right: 12, top: 10 }}
            >
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                className="stroke-muted"
              />

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value}`}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Area
                dataKey="amount"
                type="monotone"
                stroke="hsl(var(--primary))"
                fill="url(#fillRevenue)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AreaChartUi;