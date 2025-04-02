import { Pool } from "pg";
import 'dotenv/config'

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  idleTimeoutMillis: 30000,
});

export default pool;

export const createTable = async () => {

  const createTable = `CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NUll,
    grade INTEGER NOT NULL) `;

  return pool.query(createTable);

}