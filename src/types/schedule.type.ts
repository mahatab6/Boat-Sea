export interface ISchedule {
  id: string;

  boatId: string;
  routeId: string;
  userId: string;

  startDate: string;
  endDate: string | null;

  departureTime: string;
  arrivalTime: string;

  availableSeats: number;

  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

  recurringPattern: "DAILY" | "WEEKLY" | "MONTHLY" | null;

  createdAt: string;
  updatedAt: string;
  routeName?: string;
  difficulty?: string;
  distance?: string;
  duration?: string;
  boat?: {
    boatName: string;
  };

  route?: {
    name: string;
  };
}
