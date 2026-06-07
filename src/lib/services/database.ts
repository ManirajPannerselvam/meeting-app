import Database from "@tauri-apps/plugin-sql";

let db: any;

export async function initDB() {
  db = await Database.load("sqlite:meeting.db");

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
    )
  `);

  return db;
}

export async function saveMeeting(meeting: any) {
  await db.execute(
    `INSERT INTO meetings
    (title, agenda, meeting_type, meeting_date,
     start_time, end_time, participants)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
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

export async function getMeetings() {
  return await db.select(
    "SELECT * FROM meetings ORDER BY id DESC"
  );
}