import Database from "@tauri-apps/plugin-sql";
import bcrypt from "bcryptjs";

export async function registerUser(
  username: string,
  password: string,
  role = "User"
) {
  const db = await Database.load("sqlite:meeting.db");

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.execute(
    "INSERT INTO users (username,password,role) VALUES (?,?,?)",
    [username, hashedPassword, role]
  );
}

export async function loginUser(
  username: string,
  password: string
) {
  const db = await Database.load("sqlite:meeting.db");

  const users = await db.select(
    "SELECT * FROM users WHERE username=?",
    [username]
  );

  if (users.length === 0) {
    return null;
  }

  const user = users[0] as any;

  const valid = await bcrypt.compare(
    password,
    user.password
  );

  return valid ? user : null;
}