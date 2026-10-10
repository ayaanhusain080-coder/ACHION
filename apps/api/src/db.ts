import dotenv from "dotenv";
import path from "node:path";
import { Pool } from "pg";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export const db = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

export async function testDatabaseConnection(): Promise<void> {
  const result = await db.query(
    "SELECT current_database() AS database, current_user AS user",
  );

  console.log("🗄️ PostgreSQL connected:", result.rows[0]);
}
