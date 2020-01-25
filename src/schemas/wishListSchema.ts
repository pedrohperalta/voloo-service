import { Document, model, Schema } from 'mongoose'

interface WishListDb extends Document {
  name: string
  category: string
  isPrivate: boolean
}

const WishListSchema = new Schema({
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
  }
}, {
  timestamps: true
})

export default model<WishListDb>('WishList', WishListSchema)
