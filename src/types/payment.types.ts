export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum PaymentMethod {
  STRIPE = "STRIPE",
  CASH = "CASH", // Jodi thake
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  stripeEventId: string | null;
  amount: string; // JSON e string hishebe asche ("1656")
  currency: string;
  paymentMethod: PaymentMethod | string;
  transactionId: string;
  paymentStatus: PaymentStatus;
  paymentDate: string | null;
  paymentDetails: string | null; // Database theke stringified JSON ashe
  refundId: string | null;
  refundDate: string | null;
  createdAt: string;
}