import { isTauri } from "$lib/utils/env";

let db: any = null;
let initialized = false;

export async function getDB() {
  if (!isTauri()) return null;
  if (initialized && db) return db;

  const Database = await import("@tauri-apps/plugin-sql");

  db = await Database.load("sqlite:meeting.db");
  initialized = true;

  return db;
}