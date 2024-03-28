import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSlicedAddress = (address: string) => {
  const length = address.length;

  return address.substring(0, 7) + "..." + address.substring(length - 7);
};
