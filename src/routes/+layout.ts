export const ssr = false;

import { initDB } from "$lib/services/database";

export async function load() {
  try {
    const db = await initDB();
    return {
      dbReady: !!db,
      error: null
    };
  } catch (error) {
    return {
      dbReady: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}