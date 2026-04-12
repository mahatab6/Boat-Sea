export interface BookingRequest {
  id: string;
  bookingNumber: string;
  userId: string;
  scheduleId: string;
  boatId: string;
  totalGuests: number;
  totalAmount: number;
  bookingStatus: 'CONFIRMED' | 'PENDING' | 'CANCELLED'; 
  paymentStatus: 'PAID' | 'UNPAID' | 'PARTIAL';
  bookingDate: string; 
  tripDate: string;    
  passengerDetails: PassengerDetail[];
  specialRequests: string | null;
  cancellationDate: string | null;
  cancellationReason: string | null;
  emergencyContact: string | null;
  isInsured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PassengerDetail {
  fullName: string;
  isPrimary: boolean;
}

export interface IReview {
  id: string;
  userId: string 
  boatId: string ;
  rating: number;
  comment: string;
  images?: string[];
  isDeleted: boolean;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
  reviewerName?: string;
  reviewerImage?: string | null;
}

