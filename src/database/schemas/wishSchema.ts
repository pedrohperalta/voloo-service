import { Document, Schema } from 'mongoose'

export interface WishModel extends Document {
  readonly name: string
  readonly linkUrl: string | null
  readonly currency: string
  readonly price: number
  readonly comments: string | null
}

export const WishSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  linkUrl: {
    type: String,
    trim: true
  },
  currency: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})
