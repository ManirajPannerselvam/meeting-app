-- migration: create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  meeting_id INTEGER,
  user_id INTEGER,
  present INTEGER,
  timestamp TEXT
);
