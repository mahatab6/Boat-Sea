
export interface ChartDataPoint {
  status: 'CANCELLED' | 'COMPLETED' | 'PENDING'; 
  count: number;
}

export interface MonthlyBookingData {
  month: string; // ISO Date string
  count: number;
}

export interface DashboardData {
  totalBookings: number;
  activeTripCount: number;
  totalSpent: number;
  piChartData: ChartDataPoint[];
  barChartData: MonthlyBookingData[];
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}