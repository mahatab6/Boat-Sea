import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface IBoat {
  id: string;
  boatName: string;
  boatType: 'SPEEDBOAT' | 'YACHT' | 'FISHING_BOAT' | string;
  status: 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE';
  capacity: number;
  ownerId: string;
  primary_img: string | StaticImport;
  boatCondition: string;
  location: string;
  pricePerTrip: number;
  length: number;
  width: number;
  engineCapacity: number;
  manufacturer: string;
  manufacturingYear: number;
  amenities: string[];
  cancellationPolicy: string;
  rating: number;
  totalReviews: number;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  boat_images: string[]; 
}

export interface MyBoatsResponse {
  success: boolean;
  message: string;
  data: IBoat[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}