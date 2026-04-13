"use client"

import React, { useMemo } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface LineChartDataPoint {
  createdAt: string;
  amount: string | number; // String holeo jate handle kora jay
}

interface LineChartProps {
  data?: LineChartDataPoint[];
  title?: string;
  description?: string;
}

const LineChartUi = ({ 
  data, 
  title = "Revenue Overview", 
  description = "Monthly overview of your bookings" 
}: LineChartProps) => {

  // Data transform korchi jate Recharts 'day' ebong 'earnings' khuje pay
  const chartData = useMemo(() => {
    if (!data) return [];

    const earningsMap = data.reduce((acc: Record<string, number>, item) => {
      const date = new Date(item.createdAt);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });
      
      // String amount ke number-e convert korchi
      const val = typeof item.amount === 'string' ? parseFloat(item.amount) : item.amount;
      
      acc[day] = (acc[day] || 0) + val;
      return acc;
    }, {});

    return Object.entries(earningsMap).map(([day, total]) => ({
      day,      // X-Axis er jonno
      earnings: total, // Line dataKey er jonno
    }));
  }, [data]);

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{description}</p>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="day" // Ekhon match korbe
              stroke="#9CA3AF"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={(value) => `$${value}`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
               contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Line
              type="monotone"
              dataKey="earnings" // Ekhon match korbe
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 4, fill: "#2563EB", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6 }}
              isAnimationActive
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default LineChartUi