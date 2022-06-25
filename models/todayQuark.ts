const mongoose = require('mongoose') // requiring the mongoose package

const todayQuarkSchema = new mongoose.Schema({
  name: {
    type: String,
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
  complete: {
    type: Boolean
  },
  todayComplete: {
    type: Boolean
    },
})

export default mongoose.models.Quark || mongoose.model('TodayQuark', todayQuarkSchema)   // creating the model from the schema
