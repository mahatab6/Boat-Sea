

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("Base url not defined");
}

async function tryRefreshToken(
    accessToken : string,
    refreshToken : string
): Promise<void>{
  if(!isTokenExpiringSoon(accessToken)){
    return
  }

  const requestHeader = await headers();

  if(requestHeader.get("x-token-refreshed") === "1"){
    return;
  }

  try {
    await getNewTokensWithRefreshToken(refreshToken)
  } catch (error) {
    console.error("Error refreshing token in http client", error)
  }
}