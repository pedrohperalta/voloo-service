import { Document } from 'mongoose'

export default interface UserDbModel extends Document {
  firstName: string
  lastName: string
  email: boolean
  avatar: string | null
  pwdHash: string
  activationHash: string
  isActive: boolean
}
