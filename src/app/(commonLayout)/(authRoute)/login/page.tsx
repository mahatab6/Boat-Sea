import LoingForm from "@/components/modules/auth/LoingForm";
import React from "react";

interface LoginParams {
  searchParams: Promise<{ redirect?: string }>;
}

const LoginPage = async ({ searchParams }: LoginParams) => {
  const params = await searchParams;
  const redirectPath = params.redirect;

  return <LoingForm redirectPath={redirectPath} />;
};

export default LoginPage;
