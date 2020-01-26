import { Model } from 'mongoose'
import { Wish } from '../entities'
import { WishDbModel } from './schemas'

export class WishDb {
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
}
