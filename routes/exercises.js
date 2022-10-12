const express = require('express')
const {
  getExercises, 
  getExercise, 
  createExercise, 
  deleteExercise, 
  updateExercise
} = require('../controllers/exerciseController')

const router = express.Router()

router.get('/', getExercises)

router.get('/:id', getExercise)

router.post('/', createExercise)

router.delete('/:id', deleteExercise)

router.patch('/:id', updateExercise)

module.exports = router