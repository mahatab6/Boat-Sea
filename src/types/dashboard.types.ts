export interface ChartDataPoint {
  status: "CANCELLED" | "COMPLETED" | "PENDING";
  count: number;
}

export interface MonthlyBookingData {
  month: string; // ISO Date string
  count: number;
}

export interface DashboardData {
  totalBoats: number;
  totalUsers: number;
  totalBookings: number;
  activeTripCount: number;
  totalEarnings: number;
  myBoatsCount: number;
  totalRevenue: number;
  totalSpent: number;
  piChartData: ChartDataPoint[];
  barChartData: MonthlyBookingData[];
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}
