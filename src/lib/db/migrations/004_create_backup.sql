-- migration: create backup table
CREATE TABLE IF NOT EXISTS backup (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  file_path TEXT,
  created_at TEXT
);
