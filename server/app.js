const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cohorts = require("./cohorts.json");
const students = require("./students.json");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

// branch

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

mongoose
  .connect("mongodb://127.0.0.1:27017/cohorts-tools-API")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5005"] }));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//Api for Cohorts
app.get("/api/cohorts", async (req, res) => {
  try {
    const cohort = await Cohort.find()
    res.status(200).json(cohort);
  }
  catch (error) {
    res.status(500).json({ error })
  }
});

app.get("/api/cohorts/:cohortId", async (req, res) => {
  const { cohortId } = req.params
  if (mongoose.isValidObjectId(cohortId)) {
    try {
      const cohort = await Cohort.findById(cohortId)
      res.status(200).json(cohort);
    }
    catch (error) {
      res.status(500).json({ error })
    }
  } else {
    res.status(400).json({ message: 'Not valid ObjectId' })
  }
});

app.post('/api/cohorts', async (req, res) => {
  try {
    const cohort = await Cohort.create(req.body)
    res.status(201).json(cohort);
  }
  catch (error) {
    res.status(500).json({ error })
  }
});

app.put('/api/cohorts/:cohortId', async (req, res) => {
  const { cohortId } = req.params
  if (mongoose.isValidObjectId(cohortId)) {
    try {
      const cohort = await Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
      res.status(202).json(cohort);
    }
    catch (error) {
      res.status(500).json({ error })
    }
  } else {
    res.status(400).json({ message: 'Not valid ObjectId' })
  }
});

app.delete('/api/cohorts/:cohortId', async (req, res) => {
  const { cohortId } = req.params
  if (mongoose.isValidObjectId(cohortId)) {
    try {
      await Cohort.findByIdAndDelete(cohortId)
      res.status(202).json({ message: 'No Content' });
    }
    catch (error) {
      res.status(500).json({ error })
    }
  } else {
    res.status(400).json({ message: 'Not valid ObjectId' })
  }
});

//Students Api
app.get("/api/students", async (req, res) => {
  try {
    const student = await Student.find()
      .populate('cohort')
    res.status(200).json(student);
  }
  catch (error) {
    res.status(500).json({ error })
  }
});

app.get("/api/students/cohort/:cohortId", async (req, res) => {
  const { cohortId } = req.params
  if (mongoose.isValidObjectId(cohortId)) {
    try {
      const students = await Student.find({ cohort: cohortId })
        .populate('cohort')
      res.status(200).json(students);
    }
    catch (error) {
      res.status(500).json({ error })
    }
  } else {
    res.status(400).json({ message: 'Not valid ObjectId' })
  }
});

app.get("/api/students/:studentId", async (req, res) => {
  const { studentId } = req.params
  if (mongoose.isValidObjectId(studentId)) {
    try {
      const student = await Student.findById(studentId)
        .populate('cohort')
      res.status(200).json(student);
    }
    catch (error) {
      res.status(500).json({ error })
    }
  } else {
    res.status(400).json({ message: 'Not valid ObjectId' })
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const student = await Student.create(req.body)
    res.status(201).json(student);
  }
  catch (error) {
    res.status(500).json({ error })
  }
});

app.put('/api/students/:studentId', async (req, res) => {
  const { studentId } = req.params
  if (mongoose.isValidObjectId(studentId)) {
    try {
      const student = await Student.findByIdAndUpdate(studentId, req.body, { new: true })
      res.status(202).json(student);
    }
    catch (error) {
      res.status(500).json({ error })
    }
  } else {
    res.status(400).json({ message: 'Not valid ObjectId' })
  }
});

app.delete('/api/students/:studentId', async (req, res) => {
  const { studentId } = req.params
  if (mongoose.isValidObjectId(studentId)) {
    try {
      await Student.findByIdAndDelete(studentId)
      res.status(202).json({ message: 'No Content' });
    }
    catch (error) {
      res.status(500).json({ error })
    }
  } else {
    res.status(400).json({ message: 'Not valid ObjectId' })
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
