/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";

export const ResetPasswordAction = async (password: string, token: string) => {
  try {
    const response = await httpClient.post("/auth/reset-password", {
      password,
      token,
    });
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to reset password",
    };
  }
};