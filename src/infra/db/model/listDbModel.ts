import { Document } from 'mongoose'
import WishDbModel from './wishDbModel'

export default interface ListDbModel extends Document {
  name: string
  category: string
  isPrivate: boolean
  wishes: WishDbModel[]
}
