export const ONBOARD_KEY = "pc_onboarded";

export function isOnboarded(): boolean {
  if (typeof window === "undefined") return true; 
  return localStorage.getItem(ONBOARD_KEY) === "1";
}

export function setOnboarded() {
  if (typeof window === "undefined") return;
  localStorage.setItem(ONBOARD_KEY, "1");
}
