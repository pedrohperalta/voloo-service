import { Document } from 'mongoose'
import UserDbModel from './userDbModel'

export default interface SessionDbModel extends Document {
  token: string
  lastSeenTime: Date
  user: UserDbModel
}
