import { backendUrl } from "../constants/constant";
import { IUser } from "../types";

export const registerUser = async (formData: IUser) => {
  const response = await fetch(`${backendUrl}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formData }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }

  return await response.json();
};

export const logoutUser = async (id: string) => {
  const response = await fetch(`${backendUrl}/api/logout/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }

  return await response.json();
};
