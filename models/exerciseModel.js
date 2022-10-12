const mongoose = require('mongoose')

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  reps: {
    type: Number
  },
  duration: {
    type: Number
  }
}, { timestamps: true })

module.exports = mongoose.model('Exercise', exerciseSchema)