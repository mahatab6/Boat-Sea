import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./cookiesUtils";

const getTokenSecondsRemaining = (token: string): number => {
 
  if (!token) {
    return 0;
  }

  try {
    
   const decoded = jwt.decode(token) as JwtPayload | null;

    if (!decoded?.exp) return 0;

    const remainingSeconds =
      decoded.exp - Math.floor(Date.now() / 1000);

    return remainingSeconds > 0 ? remainingSeconds : 0;
  } catch (error) {
    console.error("Error decoding token:", error);
    return 0;
  }
};

export const setTokenInCookies = async (
    name : string,
    token : string,
    fallbackMaxAgeInSeconds = 60 * 60 * 24 // 1 days
) => {
     const maxAgeInSeconds =
    name === "accessToken" || name === "refreshToken"
      ? getTokenSecondsRemaining(token)
      : fallbackMaxAgeInSeconds;

  await setCookie(name, token, maxAgeInSeconds || fallbackMaxAgeInSeconds);
}

export async function isTokenExpiringSoon(token: string, thresholdInSeconds = 300) : Promise<boolean> {
  const remainingSeconds = getTokenSecondsRemaining(token);
  return remainingSeconds > 0 && remainingSeconds <= thresholdInSeconds;
}

export async function isTokenExpired(token: string) : Promise<boolean> {
  const remainingSeconds = getTokenSecondsRemaining(token);
  return remainingSeconds === 0;
}