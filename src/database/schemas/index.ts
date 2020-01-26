import mongoose, { model, STATES } from 'mongoose'
import { WishListModel, WishListSchema } from './wishListSchema'
import { WishModel, WishSchema } from './wishSchema'

require('dotenv').config()

const url = process.env.DB_URL
const dbName = process.env.DB_NAME

export const connect = async (): Promise<void> => {
  if (mongoose.connection.readyState === STATES.connected) {
    return
  }

  mongoose.connect(`${url}/${dbName}`, {
    useNewUrlParser: true
  })
}

export * from './wishListSchema'
export * from './wishSchema'

export const wishListDocument = model<WishListModel>('WishList', WishListSchema)
export const wishDocument = model<WishModel>('Wish', WishSchema)
