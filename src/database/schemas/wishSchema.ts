import { Document, Schema } from 'mongoose'

export interface WishDbModel extends Document {
  name: string
  linkUrl: string | null
  currency: string
  price: number
  comments: string | null
}

export const WishSchema = new Schema({
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
