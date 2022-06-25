import mongoose from 'mongoose'
import type { IQuark } from '../utils/types'

const quarkSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  file: {
    type: Object
  },
  today_complete: [{
    date_complete: Date,
    complete: Boolean
  }]
})

export default mongoose.models.Quark || mongoose.model('Quark', quarkSchema) // creating the model from the schema
