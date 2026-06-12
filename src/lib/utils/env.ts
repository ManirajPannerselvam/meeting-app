import { browser } from "$app/environment";

export function isTauri() {
  return (
    browser &&
    typeof (window as any).__TAURI__ !== "undefined"
  );
}