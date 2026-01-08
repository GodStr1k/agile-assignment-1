const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("database.db");

// Tables
db.run(`CREATE TABLE IF NOT EXISTS attendance (
  student_id TEXT,
  subject TEXT,
  percentage REAL
)`);

db.run(`CREATE TABLE IF NOT EXISTS cgpa (
  student_id TEXT,
  credits INTEGER,
  gpa REAL
)`);

// Attendance
app.post("/attendance", (req, res) => {
  const { student_id, subject, percentage } = req.body;
  db.run("INSERT INTO attendance VALUES (?, ?, ?)",
    [student_id, subject, percentage],
    () => res.json({ message: "Saved" })
  );
});

// CGPA
app.post("/cgpa", (req, res) => {
  const { student_id, credits, gpa } = req.body;

  db.run("INSERT INTO cgpa VALUES (?, ?, ?)",
    [student_id, credits, gpa],
    () => {
      db.all("SELECT credits, gpa FROM cgpa WHERE student_id=?",
        [student_id], (e, rows) => {
          let totalCredits = 0, totalPoints = 0;
          rows.forEach(r => {
            totalCredits += r.credits;
            totalPoints += r.credits * r.gpa;
          });
          res.json({
            totalCredits,
            cgpa: totalPoints / totalCredits
          });
        });
    });
});

// Dashboard
app.get("/dashboard/:id", (req, res) => {
  const id = req.params.id;

  db.all("SELECT subject, percentage FROM attendance WHERE student_id=?", [id],
    (e, att) => {
      db.all("SELECT credits, gpa FROM cgpa WHERE student_id=?", [id],
        (e, cg) => {
          let credits = 0, points = 0;
          cg.forEach(c => {
            credits += c.credits;
            points += c.credits * c.gpa;
          });
          res.json({
            attendance: att,
            credits,
            cgpa: credits ? (points / credits).toFixed(2) : "N/A"
          });
        });
    });
});

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
