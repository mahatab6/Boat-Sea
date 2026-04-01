/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import { IRegisterResponse, IRegisterResponseData } from "@/types/auth.types";
import { IRegisterPayload, registerZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const RegisterAction = async (
  payload: IRegisterPayload
): Promise<IRegisterResponse | ApiErrorResponse> => {

  const parsedPayload = registerZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0].message,
    };
  }

  try {

    const response = await httpClient.post<IRegisterResponseData>(
      "/auth/register",
      parsedPayload.data
    );

    const { user } = response.data;

    if (!user.emailVerified) {
      redirect(`/verify-email?email=${user.email}`);
    }

    return response.data;

  } catch (error: any) {

    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    return {
      success: false,
      message: `Register failed: ${error.message}`,
    };
  }
};