"use server";

import { httpClient } from "@/lib/axios/httpClient";

export const updateUserRole = async (
  id: string,
  role: string
) => {
  const res = await httpClient.put(
    "/users/updaterole",
    { id, role }
  );

  return res.data;
};

export const deleteUserAccount = async (id: string) => {
  const res = await httpClient.delete(
    `/users/account-delete/${id}`
  );

  return res.data;
};