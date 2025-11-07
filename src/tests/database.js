import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Fonction d'ouverture de la base
export async function openDb() {
  return open({
    filename: './src/db.sqlite',
    driver: sqlite3.Database
  });
}

const db = await openDb();

// Correction du DDL (structure de la table)
const ddl = `
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT,
    lastname TEXT,
    sexe TEXT CHECK (sexe IN ('M', 'F')),
    birthday DATE
  );
`;

// Exécution du DDL
await db.exec(ddl);


const dml = `
  INSERT INTO students (firstname, lastname, sexe, birthday) VALUES
  ('TRAORE', 'Aïmane', 'M', '2001-01-01'),
  ('BABAYI', 'Fayrouza', 'F', '2004-11-26'),
  ('DEGBEBIA', 'Cherif', 'M', '2001-01-01'),
  ('AROUNA', 'Ramdane', 'M', '2001-01-01');
`;

// Exécution du DML
await db.exec(dml);


