import Database from "@tauri-apps/plugin-sql";

export async function exportBackup() {
  const db = await Database.load("sqlite:meeting.db");

  const meetings = await db.select(
    "SELECT * FROM meetings"
  );

  const users = await db.select(
    "SELECT * FROM users"
  );

  const actions = await db.select(
    "SELECT * FROM action_items"
  );

  const attendance = await db.select(
    "SELECT * FROM attendance"
  );

  const backupData = {
    meetings,
    users,
    actions,
    attendance,
    backupDate: new Date().toISOString()
  };

  const blob = new Blob(
    [JSON.stringify(backupData, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "meeting_backup.json";
  a.click();

  URL.revokeObjectURL(url);
}

export async function importBackup(
  backupData: any
) {
  const db = await Database.load(
    "sqlite:meeting.db"
  );

  await db.execute("DELETE FROM meetings");
  await db.execute("DELETE FROM users");
  await db.execute("DELETE FROM action_items");
  await db.execute("DELETE FROM attendance");

  for (const meeting of backupData.meetings) {
    await db.execute(
      `INSERT INTO meetings
      (title, agenda, meeting_type,
       meeting_date, start_time,
       end_time, participants)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        meeting.title,
        meeting.agenda,
        meeting.meeting_type,
        meeting.meeting_date,
        meeting.start_time,
        meeting.end_time,
        meeting.participants
      ]
    );
  }

  for (const user of backupData.users) {
    await db.execute(
      `INSERT INTO users
      (username, password, role)
      VALUES (?, ?, ?)`,
      [
        user.username,
        user.password,
        user.role
      ]
    );
  }

  alert("Backup Restored Successfully");
}