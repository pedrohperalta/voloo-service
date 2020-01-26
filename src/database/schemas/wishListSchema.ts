import { Document, Schema } from 'mongoose'
import { WishDbModel } from './wishSchema'

export interface WishListDbModel extends Document {
  name: string
  category: string
  isPrivate: boolean
  wishes: WishDbModel[]
}

export const WishListSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  isPrivate: {
    type: Boolean,
    required: true
  },
  wishes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Wish'
    }
  ]
}, {
  timestamps: true
})
