import { Schema } from 'mongoose'

const SessionSchema = new Schema({
  token: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
  },
  lastSeenTime: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
})

export default SessionSchema
