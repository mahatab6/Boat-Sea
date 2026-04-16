export interface ILoginResponse {
    token: string;
    accessToken: string;
    refreshToken: string;
    user:{
        needPasswordChange: boolean;
        email: string;
        name: string;
        role: string;
        image: string;
        status: string;
        isDeleted: boolean;
        emailVerified: boolean;
  }
}




export interface IRegisterResponse {
  success: boolean;
  message: string;
  data: IUser;
}

export interface IRegisterResponseData {
  success: boolean;
  message: string;
  user: IUser;
    accessToken: string;
  refreshToken: string;
  token: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: "CUSTOMER" | "ADMIN" | "OWNER"; 
  status: "PENDING_VERIFICATION" | "ACTIVE" | "BLOCKED";
  isDeleted: boolean;
  deletedAt: string | null;
}

export interface IVerifyEmailData {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IVerifyEmailResponse {
  success: boolean;
  message: string;
  data: IVerifyEmailData
}

