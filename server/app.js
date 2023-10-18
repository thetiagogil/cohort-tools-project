/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: The auto-generated id of the student
 *         firstName:
 *           type: string
 *           description: The first name of the student
 *         lastName:
 *           type: string
 *           description: The last name of the student
 *         email:
 *           type: string
 *           description: The email of the student
 *         phone:
 *           type: string
 *           description: The phone number of the student
 *         linkedinUrl:
 *           type: string
 *           description: The link to the linkedIn page of the student 
 *         languages:
 *           type: string
 *           description: The link to the linkedIn page of the student
 *       example:
 *         _id: 5
 *         firstName: Katie
 *         lastName: King
 *         email: katie.king@example.com
 *         phone: 345-678-9012
 *         linkedinUrl: https://linkedin.com/in/katiekingexample
 *         languages: ["English", "German"]
 *         program: UX/UI
 *         background: Information Systems
 *         image: https://i.imgur.com/r8bo8u7.png
 *         cohort: 2
 *         projects: []
 */
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
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');



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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec ,{ explorer: true }));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});

app.get("/api/students", (req, res) => {
  res.json(students);
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
