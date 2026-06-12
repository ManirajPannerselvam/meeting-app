export async function createSchema(db: any) {
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
}