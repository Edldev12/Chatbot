import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const dataDirectory = path.join(process.cwd(), "data");

fs.mkdirSync(dataDirectory, { recursive: true });

const db = new Database(path.join(dataDirectory, "chatbot.db"));

// Improve database reliability.
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Store registered users.
db.exec(`
  CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)
  `);

export default db;
