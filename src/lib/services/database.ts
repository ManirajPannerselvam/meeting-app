import { browser } from "$app/environment";

let db: any = null;
let initialized = false;

/* ==========================
CHECK TAURI SAFE MODE
========================== */
function isTauriAvailable() {
  return (
    browser &&
    typeof (window as any).__TAURI__ !== "undefined"
  );
}

/* ==========================
DATABASE INIT
========================== */
export async function initDB() {
  try {
    if (!browser) return null;

    if (initialized && db) return db;

    if (!isTauriAvailable()) {
      console.warn("TAURI bridge not available - running in browser mode");
      return null;
    }

    console.log("Loading database...");

    const Database = await import("@tauri-apps/plugin-sql");

    db = await Database.load("sqlite:meeting.db");

    await db.execute(`
      CREATE TABLE IF NOT EXISTS meetings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        agenda TEXT,
        meeting_date TEXT,
        meeting_type TEXT
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS actions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        meeting_id INTEGER,
        description TEXT,
        status TEXT
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS devices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_model TEXT,
        imei TEXT,
        android_version TEXT,
        build_version TEXT,
        sim_number TEXT,
        owner TEXT,
        status TEXT,
        remarks TEXT
      );
    `);

    initialized = true;

    console.log("Database initialized successfully");

    return db;
  } catch (error) {
    console.error("Database initialization failed:", error);
    return null;
  }
}

/* ==========================
MEETINGS
========================== */
export async function getMeetings() {
  const database = await initDB();
  if (!database) return [];

  return await database.select(
    "SELECT * FROM meetings ORDER BY id DESC"
  );
}

export async function addMeeting(
  title: string,
  agenda: string,
  meetingDate: string,
  meetingType: string
) {
  const database = await initDB();
  if (!database) return false;

  await database.execute(
    `
    INSERT INTO meetings
    (title, agenda, meeting_date, meeting_type)
    VALUES (?, ?, ?, ?)
    `,
    [title, agenda, meetingDate, meetingType]
  );

  return true;
}

/* ==========================
ACTIONS
========================== */
export async function getActions() {
  const database = await initDB();
  if (!database) return [];

  return await database.select(
    "SELECT * FROM actions ORDER BY id DESC"
  );
}

export async function addAction(
  meetingId: number,
  description: string,
  status: string
) {
  const database = await initDB();
  if (!database) return false;

  await database.execute(
    `
    INSERT INTO actions
    (meeting_id, description, status)
    VALUES (?, ?, ?)
    `,
    [meetingId, description, status]
  );

  return true;
}

/* ==========================
DEVICES
========================== */
export async function saveDevice(data: any) {
  const database = await initDB();
  if (!database) return false;

  await database.execute(
    `
    INSERT INTO devices (
      device_model,
      imei,
      android_version,
      build_version,
      sim_number,
      owner,
      status,
      remarks
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
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

export async function getDevices() {
  const database = await initDB();
  if (!database) return [];

  return await database.select(
    "SELECT * FROM devices ORDER BY id DESC"
  );
}