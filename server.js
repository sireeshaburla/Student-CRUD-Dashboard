
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Sample student data
let students = [
  {
    id: 1,
    name: "Ravi",
    age: 21,
    department: "CSE"
  },
  {
    id: 2,
    name: "Priya",
    age: 20,
    department: "ECE"
  },
  {
    id: 3,
    name: "Arjun",
    age: 22,
    department: "IT"
  }
];

// Welcome route
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Student CRUD REST API"
  });
});

// GET: Fetch all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// GET: Fetch a student by ID
app.get("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  res.json(student);
});

// POST: Add a new student
app.post("/api/students", (req, res) => {
  const { name, age, department } = req.body;

  if (!name || !age || !department) {
    return res.status(400).json({
      message: "Name, age, and department are required"
    });
  }

  const newStudent = {
    id: students.length
      ? Math.max(...students.map(s => s.id)) + 1
      : 1,
    name: String(name).trim(),
    age: Number(age),
    department: String(department).trim()
  };

  if (!newStudent.name || !newStudent.department ||
      !Number.isFinite(newStudent.age) || newStudent.age <= 0) {
    return res.status(400).json({
      message: "Please provide valid student details"
    });
  }

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

// PUT: Update an existing student
app.put("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const { name, age, department } = req.body;

  if (!name || !age || !department) {
    return res.status(400).json({
      message: "Name, age, and department are required"
    });
  }

  const updatedAge = Number(age);

  if (
    !String(name).trim() ||
    !String(department).trim() ||
    !Number.isFinite(updatedAge) ||
    updatedAge <= 0
  ) {
    return res.status(400).json({
      message: "Please provide valid student details"
    });
  }

  student.name = String(name).trim();
  student.age = updatedAge;
  student.department = String(department).trim();

  res.json({
    message: "Student updated successfully",
    student
  });
});

// DELETE: Remove a student
app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const [deleted] = students.splice(index, 1);

  res.json({
    message: "Student deleted successfully",
    student: deleted
  });
});

// Serve the dashboard for other non-API routes
// This replaces app.get("*"), which causes an error in Express 5.
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Student dashboard running on port ${PORT}`);
});