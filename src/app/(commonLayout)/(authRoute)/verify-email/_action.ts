/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { IVerifyEmailData, IVerifyEmailResponse } from "@/types/auth.types";
import {
  IverifyemailPayload,
  verifyemailZodSchema,
} from "@/zod/auth.validation";


export const VerifyEmailAction = async (payload: IverifyemailPayload) => {
  const parsedPayload = verifyemailZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";
    return {
      success: false,
      message: firstError,
    };
  }

  try {
    const response = await httpClient.post<IVerifyEmailData>(
      "/auth/verify-email",
      parsedPayload.data,
    );

   
      const { accessToken , refreshToken, user } = response?.data 
      await setTokenInCookies("accessToken",  accessToken);
      await setTokenInCookies("refreshToken", refreshToken);

      if (user.emailVerified === true) {
        return {
          success: true,
          message:  "Email verified successfully",
        };
      }

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
      message: `Verify failed: ${error.message}`,
    };
  }
};
