DROP TABLE IF EXISTS students;
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT,
    lastname TEXT,
    sexe TEXT CHECK (sexe IN ('M', 'F')),
    birthday DATE
  );