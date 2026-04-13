import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Default colors for chart slices
const CHART_COLORS = [
  'oklch(0.646 0.222 41.116)', // Primary/Orange
  'oklch(0.511 0.262 276.966)', // Purple
  'oklch(0.627 0.265 303.9)',   // Pink
  'oklch(0.448 0.119 215.221)', // Blue
];

interface PieChartDataPoint {
  status: string;
  count: number;
}

interface BoatPieChartProps {
  data?: PieChartDataPoint[];
  title?: string;
  description?: string;
}


const BoatPieChart = ({ 
  data, 
  title = "Booking Status", 
  description = "Distribution of trip statuses" 
}: BoatPieChartProps) => {

  // 1. Data Validation & Empty States
  if (!data || !Array.isArray(data)) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-sm text-muted-foreground">Invalid data provided.</p>
        </CardContent>
      </Card>
    );
  }

  // 2. Format data: "CANCELLED" -> "Cancelled"
  const formattedData = data.map((item) => ({
    name: item.status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    value: Number(item.count),
  }));

  // Check if all values are zero
  if (!formattedData.length || formattedData.every((item) => item.value === 0)) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-sm text-muted-foreground">No data to display.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formattedData}
                cx="50%"
                cy="50%"
                innerRadius={70} 
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {formattedData.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CHART_COLORS[index % CHART_COLORS.length]} 
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    backgroundColor: 'hsl(var(--background))',
                    color: 'hsl(var(--foreground))'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoatPieChart;