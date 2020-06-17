import { Schema } from 'mongoose'

const SessionSchema = new Schema({
  token: {
    type: String,
    required: true,
    trim: true,
  },
  lastSeenTime: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
})

export default SessionSchema
