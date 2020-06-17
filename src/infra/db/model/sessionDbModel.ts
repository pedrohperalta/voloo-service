import { Document } from 'mongoose'

export default interface SessionDbModel extends Document {
  token: string
  userId: string
  lastSeenTime: Date
}
