import http from "http";
import fs from "fs";
import dotenv from "dotenv";
import StudentController from "./controllers/studentController.js";
import Database  from "../src/config/database.js";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db_path='/home/degbebia/2025-2026/Node JS S5/gestion_note/src/db.sqlite';

dotenv.config(); 

const db = await Database.getDatabaseInstance(); 

await db.initDB(); 

console.log("Base de données connectée ",);


// Charger les variables d'environnementdotenv.config();
/*
 * GET /students -> students list
 * GET /student/id -> student details
 * POST /students -> student created
 * PUT | PATCH /student/:id -> student updated
 * DELETE /student/:id -> student deleted
 */

const studentController = new StudentController();

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = new URL(req.url, `http://${req.headers.host}`);
  const endpoint = method + ":" + url.pathname;

  res.setHeader("Content-Type", "text/plain");

  console.log(method);
  console.log(endpoint);

  switch (endpoint) {
    case "GET:/students":
      studentController.read(req, res);
      break;

    case "GET:/student":
      studentController.get(req, res);
      break;

    case "POST:/students":
      studentController.create(req, res);
      break;

    case "PUT:/student":
      studentController.update(req, res);
      // console.log("student Updated");
      // res.end("student Updated");
      break;

    case "DELETE:/student":
      studentController.delete(req, res);
      //console.log("students deleted");
      //res.end("students deleted");
      break;

    default:
      res.end("Page not found !");
  }
});

server.listen(process.env.PORT || 3000, () => {
  console.log("server Start ...");
});
