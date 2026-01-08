const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("database.db");

db.run(`CREATE TABLE IF NOT EXISTS attendance (
  student_id INTEGER,
  percentage REAL
)`);

db.run(`CREATE TABLE IF NOT EXISTS cgpa (
  student_id INTEGER,
  cgpa REAL
)`);

app.post("/attendance", (req, res) => {
  db.run("INSERT INTO attendance VALUES (?, ?)",
    [req.body.student_id, req.body.percentage]);
  res.json({ message: "Attendance saved" });
});

app.post("/cgpa", (req, res) => {
  db.run("INSERT INTO cgpa VALUES (?, ?)",
    [req.body.student_id, req.body.cgpa]);
  res.json({ message: "CGPA saved" });
});

app.get("/dashboard/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT percentage FROM attendance WHERE student_id=?",
    [id], (e, a) => {
      db.get("SELECT cgpa FROM cgpa WHERE student_id=?",
        [id], (e, c) => {
          res.json({ attendance: a?.percentage, cgpa: c?.cgpa });
        });
    });
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
