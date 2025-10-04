import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function getStatusColor(status: number) {
  if (status >= 200 && status < 300) return "text-success"
  if (status >= 300 && status < 400) return "text-warning"
  return "text-destructive"
}

