/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose'
import { Wish } from '../../entities'
import { WishDbModel } from '../db'

export default class WishRepository {
  private document: Model<WishDbModel>

  constructor(document: Model<WishDbModel>) {
    this.document = document
  }

  create = async (wish: Wish): Promise<Wish> => {
    const created = await this.document.create(wish)

    return {
      ...wish,
      id: created.id,
    }
  }

  find = async (id: string): Promise<Wish | null> => {
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
    if (!Types.ObjectId.isValid(id)) {
      return null
    }

    const edited = await this.document.findByIdAndUpdate(
      id,
      { $set: newWish },
      { new: true },
    )

    if (!edited) {
      return null
    }

    return new Wish(edited)
  }

  delete = async (id: string): Promise<Wish | null> => {
    const deleted = await this.document.findByIdAndDelete(id)
    if (!deleted) {
      return null
    }

    return new Wish(deleted)
  }
}
