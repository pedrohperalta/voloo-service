import { Schema } from 'mongoose'

const WishSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  linkUrl: {
    type: String,
    trim: true,
  },
  currency: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
})

export default WishSchema
