const Exercise = require('../models/exerciseModel')
const mongoose = require('mongoose')

const getExercises = async (req, res) => {
  const exercises = await Exercise.find({}).sort({createdAt: -1})

  res.status(200).json(exercises)
}

const getExercise = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such exercise'})
  }

  const exercise = await Exercise.findById(id)

  if (!exercise) {
    return res.status(404).json({error: 'No such exercise'})
  }

  res.status(200).json(exercise)
}

const createExercise = async (req, res) => {
  const {title, duration, reps} = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  
  if (emptyFields.length>0) {
    return res.status(400).json({ error: 'Please fill in the title', emptyFields })
  }

  try {
    const exercise = await Exercise.create({ title, duration, reps })
    res.status(200).json(exercise)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteExercise = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such exercise'})
  }

  const exercise = await Exercise.findOneAndDelete({_id: id})

  if(!exercise) {
    return res.status(400).json({error: 'No such exercise'})
  }

  res.status(200).json(exercise)
}

const updateExercise = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such exercise'})
  }

  const exercise = await Exercise.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!exercise) {
    return res.status(400).json({error: 'No such exercise'})
  }

  res.status(200).json(exercise)
}

module.exports = {
  getExercises,
  getExercise,
  createExercise,
  deleteExercise,
  updateExercise
}