"use client";

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { format, parseISO } from 'date-fns';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Interface update kora hoyeche jate 'amount' ba 'count' duitoi support kore
interface BarChartDataPoint {
  month: string;
  count?: number;
  amount?: number | string;
}

interface BarChartForAdminProps {
  data?: BarChartDataPoint[];
  title?: string;
  description?: string;
}

const BarChartForAdmin = ({ 
  data, 
  title = "Revenue Statistics", 
  description = "Monthly overview of your earnings" 
}: BarChartForAdminProps) => {

  // Data processing logic
  const formattedData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((item) => {
      // Console data-te 'amount' field asche, tai seta ke priority deya hocche
      const value = item.amount !== undefined ? item.amount : (item.count || 0);
      
      return {
        displayMonth: format(parseISO(item.month), "MMM yyyy"),
        value: Number(value), // Chart-er bar height-er jonno
      };
    });
  }, [data]);

  // Handle empty state
  if (!data || formattedData.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[350px]">
          <p className="text-sm text-muted-foreground">
            No data available for this period.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full shadow-sm border-gray-100">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={formattedData} 
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="hsl(var(--muted))" 
              />
              <XAxis 
                dataKey="displayMonth" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  backgroundColor: 'white'
                }}
                formatter={(value) => {
                  if (typeof value === 'number') {
                    return [`$${value.toFixed(2)}`, "Revenue"];
                  }
                  return [value, "Revenue"];
                }}
              />
              <Bar
                dataKey="value" // Processing logic-er 'value' field-ti ekhane use hobe
                fill="oklch(0.646 0.222 41.116)" // Chart color
                radius={[6, 6, 0, 0]}
                maxBarSize={50}
                activeBar={{ 
                  fill: 'oklch(0.55 0.222 41.116)', 
                  cursor: 'pointer'
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChartForAdmin;