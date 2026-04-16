import { ApiResponse } from "@/types/api.types";
import axios from "axios";
import { cookies } from "next/headers";

const getApiBaseUrl = () => {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    throw new Error("Base url not defined");
  }
  return baseUrl;
};

const axiosInstance = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const instance = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 30000,
    headers: {
      Cookie: cookieHeader,
    
    },
  });

  return instance;
};

// Helper to detect if we are sending FormData
const isFormData = (data: unknown): data is FormData => {
  return data instanceof FormData;
};

export interface ApiRequestOptions {
  params?: Record<string, unknown>;
  headers: Record<string, string>;
}


const httpGet = async <TData>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<TData>> => {
  const instance = await axiosInstance();
  const response = await instance.get(endpoint, options);
  return response.data;
};

const httpPost = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions
) : Promise<ApiResponse<TData>> => {
  const instance = await axiosInstance();

  const response = await instance.post(endpoint, data, {
    ...(isFormData(data) && { headers: { "Content-Type": "multipart/form-data" } }),
    ...options,
  });

  return response.data;
};

const httpPut = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions
) : Promise<ApiResponse<TData>> => {
  const instance = await axiosInstance();

  const response = await instance.put(endpoint, data, {
    // Important: If sending FormData → remove Content-Type or let Axios set it
    ...(isFormData(data) 
      ? { headers: { "Content-Type": "multipart/form-data" } } 
      : { headers: { "Content-Type": "application/json" } }
    ),
    ...options,
  });

  return response.data;
};

const httpPatch = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions
) : Promise<ApiResponse<TData>> => {
  const instance = await axiosInstance();
  const response = await instance.patch(endpoint, data, {
    ...(isFormData(data) 
      ? { headers: { "Content-Type": "multipart/form-data" } } 
      : { headers: { "Content-Type": "application/json" } }
    ),
    ...options,
  });
  return response.data;
};

const httpDelete = async <TData>(endpoint: string, options?: ApiRequestOptions) : Promise<ApiResponse<TData>> => {
  const instance = await axiosInstance();
  const response = await instance.delete(endpoint, options);
  return response.data;
};

export const httpClient = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
};