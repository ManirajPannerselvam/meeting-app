import { getDB, initDB } from "../database";

export async function getMeetings() {
  const db = await initDB();
  if (!db) throw new Error("DB not available. Run inside Tauri");

  return await db.select(
    "SELECT * FROM meetings ORDER BY id DESC"
  );
}

export async function saveMeeting(meeting: any) {
  const db = await initDB();
  if (!db) throw new Error("DB not available. Run inside Tauri");

  await db.execute(
    `INSERT INTO meetings 
    (title, agenda, meeting_type, meeting_date, start_time, end_time, participants)
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