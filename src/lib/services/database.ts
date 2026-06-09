import Database from "@tauri-apps/plugin-sql";

let db: any;

export async function initDB() {
    try {
        if (typeof window === "undefined") {
            console.log("Not in browser context");
            return null;
        }

        if (!(window as any).__TAURI__) {
            throw new Error("Tauri API not available. Run with cargo tauri dev");
        }

        if (!db) {
            db = await Database.load("sqlite:meeting.db");

            // All tables - run once
            await db.execute(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE,
                    password TEXT,
                    role TEXT,
                    department TEXT,
                    is_active INTEGER DEFAULT 1
                );
            `);

            await db.execute(`
                CREATE TABLE IF NOT EXISTS meetings (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT,
                    agenda TEXT,
                    meeting_type TEXT,
                    meeting_date TEXT,
                    start_time TEXT,
                    end_time TEXT,
                    participants TEXT
                );
            `);

            await db.execute(`
                CREATE TABLE IF NOT EXISTS meeting_minutes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    meeting_id INTEGER,
                    summary TEXT,
                    decisions TEXT,
                    action_items TEXT,
                    created_at TEXT
                );
            `);

            await db.execute(`
                CREATE TABLE IF NOT EXISTS action_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    meeting_id INTEGER,
                    task TEXT,
                    owner TEXT,
                    due_date TEXT,
                    status TEXT
                );
            `);

            await db.execute(`
                CREATE TABLE IF NOT EXISTS employees (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    employee_id TEXT,
                    name TEXT,
                    email TEXT,
                    department TEXT,
                    designation TEXT
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

            await db.execute(`
                CREATE TABLE IF NOT EXISTS sim_inventory (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    sim_number TEXT,
                    operator_name TEXT,
                    circle TEXT,
                    plan_name TEXT,
                    monthly_cost REAL,
                    assigned_device TEXT,
                    owner TEXT,
                    status TEXT,
                    remarks TEXT
                );
            `);

            // Add other tables here if needed...
            
            console.log("Database initialized successfully");
        }

        return db;

    } catch (error) {
        console.error("Database initialization failed:", error);
        return null;
    }
}

/* Meetings API */
export async function getMeetings() {
  const db = await initDB();
  if (!db) throw new Error("Database not initialized. Run with cargo tauri dev");
  return await db.select("SELECT * FROM meetings ORDER BY id DESC");
}

export async function saveMeeting(meeting: any) {
  const db = await initDB();
  if (!db) throw new Error("Database not initialized. Run with cargo tauri dev");
  await db.execute(
    `INSERT INTO meetings
    (title, agenda, meeting_type, meeting_date, start_time, end_time, participants)
    VALUES (?, ?, ?)`,
    [
      meeting.title,
      meeting.agenda,
      meeting.meetingType,
      meeting.meetingDate,
      meeting.startTime,
      meeting.endTime,
      meeting.participants
    ]
  );
}