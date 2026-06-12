-- migration: create sim_inventory table
CREATE TABLE IF NOT EXISTS sim_inventory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sim_number TEXT,
  operator TEXT,
  status TEXT,
  remarks TEXT
);
