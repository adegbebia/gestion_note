import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs/promises';
import path from 'path';

export default class Database {
  static instance;
  connection;

  // Chemin absolu vers la base SQLite
  static db_path = `${process.cwd()}/src/db.sqlite3`;

  static async getDatabaseInstance() {
    if (!Database.instance) {
      const db = new Database();
      await db.openDb(Database.db_path);
      Database.instance = db;
    }
    return Database.instance;
  }

  async openDb(db_path) {
    this.connection = await open({
      filename: db_path,
      driver: sqlite3.Database,
    });
    await this.initDB();
  }

  async initDB() {
    console.log("Création des tables...");
    const base_dir = path.dirname(new URL(import.meta.url).pathname);

    const ddl_sql = await fs.readFile(path.join(base_dir, 'ddl.sql'), 'utf8');
    await this.connection.exec(ddl_sql);

    console.log("Insertion des données...");
    const dml_sql = await fs.readFile(path.join(base_dir, 'dml.sql'), 'utf8');
    await this.connection.exec(dml_sql);
  }
}
