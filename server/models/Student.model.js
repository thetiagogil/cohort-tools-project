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
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  phone: {type: String, required: true},
  linkedinUrl: {type: String, default: ''},
  languages: {type: [String], enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"]},
  program: {type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
  background: {type: String, default: ''},
  image: {type: String, default: 'https://i.imgur.com/r8bo8u7.png'},
  cohort: { type: mongoose.Schema.Types.ObjectId, ref: "Cohort" },
  projects: [String],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
