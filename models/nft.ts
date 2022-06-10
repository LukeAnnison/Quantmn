const mongoose = require('mongoose') // requiring the mongoose package
import type { INft } from '../utils/types'

const nftSchema = new mongoose.Schema({
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
  }
})

export default mongoose.models.Nft || mongoose.model('Nft', nftSchema)   // creating the model from the schema
