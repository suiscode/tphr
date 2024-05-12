import { jwtVerify, SignJWT } from "jose";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SessionInterface } from "./interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const verifyAuth = async (token: string) => {
  const verified = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
  );
  if (verified.payload.role !== "ADMIN") {
    return false;
  } else {
    return true;
  }
};
