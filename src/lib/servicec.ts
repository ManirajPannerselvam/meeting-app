import { getDB } from "./client";
import { createSchema } from "./schema";

/* =========================
INIT DATABASE
========================= */
export async function initDatabase() {
  const db = await getDB();

  if (!db) {
    console.warn("🟡 Running in BROWSER mode (no Tauri DB)");
    return null;
  }

  await createSchema(db);
  return db;
}

/* =========================
MEETINGS
========================= */
export async function getMeetings() {
  const db = await initDatabase();
  if (!db) return [];

  return await db.select(
    "SELECT * FROM meetings ORDER BY id DESC"
  );
}

export async function addMeeting(data: any) {
  const db = await initDatabase();
  if (!db) return false;

  await db.execute(
    `INSERT INTO meetings (title, agenda, meeting_date, meeting_type)
     VALUES (?, ?, ?, ?)`,
    [data.title, data.agenda, data.date, data.type]
  );

  return true;
}

/* =========================
ACTIONS
========================= */
export async function getActions() {
  const db = await initDatabase();
  if (!db) return [];

  return await db.select(
    "SELECT * FROM actions ORDER BY id DESC"
  );
}

export async function addAction(data: any) {
  const db = await initDatabase();
  if (!db) return false;

  await db.execute(
    `INSERT INTO actions (meeting_id, description, status)
     VALUES (?, ?, ?)`,
    [data.meetingId, data.description, data.status]
  );

  return true;
}

/* =========================
DEVICES
========================= */
export async function getDevices() {
  const db = await initDatabase();
  if (!db) return [];

  return await db.select(
    "SELECT * FROM devices ORDER BY id DESC"
  );
}

export async function saveDevice(data: any) {
  const db = await initDatabase();
  if (!db) return false;

  await db.execute(
    `INSERT INTO devices (
      device_model,
      imei,
      android_version,
      build_version,
      sim_number,
      owner,
      status,
      remarks
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.deviceModel,
      data.imei,
      data.androidVersion,
      data.buildVersion,
      data.simNumber,
      data.owner,
      data.status,
      data.remarks
    ]
  );

  return true;
}