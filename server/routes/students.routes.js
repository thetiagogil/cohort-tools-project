const router = require('express').Router()
const mongoose = require("mongoose");
const Student = require('../models/Student.model')

router.get("/", async (req, res) => {
  try {
    const student = await Student.find()
      .populate('cohort')
    res.status(200).json(student);
  }
  catch (error) {
    res.status(500).json({ error })
  }
});

router.get("/cohort/:cohortId", async (req, res) => {
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

router.get("/:studentId", async (req, res) => {
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

router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body)
    res.status(201).json(student);
  }
  catch (error) {
    res.status(500).json({ error })
  }
});

router.put('/:studentId', async (req, res) => {
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

router.delete('/:studentId', async (req, res) => {
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

module.exports = router

// https://ih-crud-api.herokuapp.com/characters
