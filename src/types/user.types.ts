import { UserRole } from "@/lib/authUtils";

export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION" | "BANNED";


export interface UserInfo {
    id : string;
    name : string,
    email : string,
    role : UserRole
}

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string; 
  updatedAt: string; 
  role: UserRole;
  status: UserStatus;
  isDeleted: boolean;
  deletedAt: string | null;
}