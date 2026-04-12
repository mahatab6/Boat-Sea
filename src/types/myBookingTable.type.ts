export type TMyBooking = {
  id: string;
  bookingNumber: string;
  boatName: string;
  boatId: string;
  tripDate: string;
  departureTime: string;
  totalGuests: number;
  totalAmount: number;
  bookingStatus: "PENDING" | "CONFIRMED" | "CANCELLED" | string;
  paymentStatus: "PAID" | "UNPAID" | "REFUNDED" | string;
  invoiceUrl: string | null;
};