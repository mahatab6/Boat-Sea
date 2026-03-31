import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { format, parseISO } from 'date-fns';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


interface BarChartDataPoint {
  month: string;
  count: number;
}

interface BoatBarChartProps {
  data?: BarChartDataPoint[];
  title?: string;
  description?: string;
}

const BoatBarChart = ({ 
  data, 
  title = "Booking Activity", 
  description = "Monthly overview of your bookings" 
}: BoatBarChartProps) => {

  // Handle empty or undefined data states
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[350px]">
          <p className="text-sm text-muted-foreground">
            No booking data available for this period.
          </p>
        </CardContent>
      </Card>
    );
  }

  
  const formattedData = data.map((item) => ({
    displayMonth: format(parseISO(item.month), "MMM yyyy"),
    bookings: Number(item.count),
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={formattedData} 
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
              />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--muted)/0.4)' }}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  backgroundColor: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Bar
                dataKey="bookings"
                fill="oklch(0.646 0.222 41.116)" 
                radius={[6, 6, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoatBarChart;