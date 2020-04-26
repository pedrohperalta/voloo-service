import { Document } from 'mongoose'

export default interface WishDbModel extends Document {
  name: string
  linkUrl: string | null
  currency: string
  price: number
  comments: string | null
}
