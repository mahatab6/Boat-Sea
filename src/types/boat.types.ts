import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface IBoat {
  id: string;
  boatName: string;
  boatType: "SPEEDBOAT" | "FERRY" | "LAUNCH" | "PRIVATE" | "YACHT" | "CATAMARAN";
  status: "AVAILABLE" | "BOOKED" | "MAINTENANCE" | "UNAVAILABLE" | "SUSPENDED";
  primary_img: string | StaticImport;
  capacity: number;
  ownerId: string;
  boatCondition: string;
  location: string;
  pricePerTrip: number;
  description: string;
  length: number;
  width: number;
  engineCapacity: number;
  manufacturer: string;
  manufacturingYear: number;
  specifications: string;
  amenities: string[];
  cancellationPolicy: string;

  rating: number;           
  totalReviews: number;     
  isApproved: boolean;      
  createdAt: string | Date; 
  updatedAt: string | Date;

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