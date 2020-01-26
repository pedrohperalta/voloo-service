import mongoose, { model, STATES } from 'mongoose'
import { ListDbModel, ListSchema } from './listSchema'
import { WishDbModel, WishSchema } from './wishSchema'

require('dotenv').config()

const url = process.env.DB_URL
const dbName = process.env.DB_NAME

export const connect = async (): Promise<void> => {
  if (mongoose.connection.readyState === STATES.connected) {
    return
  }

  mongoose.connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

export * from './listSchema'
export * from './wishSchema'

export const listDocument = model<ListDbModel>('List', ListSchema)
export const wishDocument = model<WishDbModel>('Wish', WishSchema)
