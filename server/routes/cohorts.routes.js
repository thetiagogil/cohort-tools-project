const router = require('express').Router()
const mongoose = require("mongoose");
const Cohort = require('../models/Cohort.model')

router.get("/", async (req, res) => {
  try {
    const cohort = await Cohort.find()
    res.status(200).json(cohort);
  }
  catch (error) {
    res.status(500).json({ error })
  }
});

router.get("/:cohortId", async (req, res) => {
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

router.post('/', async (req, res) => {
  try {
    const cohort = await Cohort.create(req.body)
    res.status(201).json(cohort);
  }
  catch (error) {
    res.status(500).json({ error })
  }
});

router.put('/:cohortId', async (req, res) => {
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

router.delete('/:cohortId', async (req, res) => {
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

module.exports = router
