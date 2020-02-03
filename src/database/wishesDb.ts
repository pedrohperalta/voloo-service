/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose'
import { Wish } from '../entities'
import { WishDbModel } from './schemas'

export class WishesDb {
  private document: Model<WishDbModel>
  private connectDb: () => Promise<void>

  constructor (document: Model<WishDbModel>, connectDb: () => Promise<void>) {
    this.document = document
    this.connectDb = connectDb
  }

  create = async (wish: Wish): Promise<Wish> => {
    await this.connectDb()

    const created = await this.document.create(wish)

    return {
      ...wish,
      id: created.id
    }
  }

  find = async (id: string): Promise<Wish | null> => {
    await this.connectDb()

    if (!Types.ObjectId.isValid(id)) {
      return null
    }

    const wishDb = await this.document.findById(id)
    if (!wishDb) {
      return null
    }

    return new Wish(wishDb)
  }

  edit = async (id: string, newWish: {[key: string]: any}): Promise<Wish | null> => {
    await this.connectDb()

    if (!Types.ObjectId.isValid(id)) {
      return null
    }

    const edited = await this.document.findByIdAndUpdate(
      id,
      { $set: newWish },
      { new: true }
    )

    if (!edited) {
      return null
    }

    return new Wish(edited)
  }
}
