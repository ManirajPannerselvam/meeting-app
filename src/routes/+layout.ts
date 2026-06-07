// Tauri doesn't have a Node.js server to do proper SSR
// so we use adapter-static with a fallback to index.html
export const ssr = false;

import { initDB } from "$lib/services/database";

export async function load() {
  try {
    await initDB();
    console.log("Database initialized");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }

  return {};
}