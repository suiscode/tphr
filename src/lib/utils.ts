import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleSignOut = async () => {
  try {
    await axios.put("/api/auth/login");
    window.location.reload();
  } catch (e) {
    console.log(e);
  }
};
