import { Schema } from 'mongoose'

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  pwdHash: {
    type: String,
    required: true,
  },
  activationHash: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true,
})

export default UserSchema
