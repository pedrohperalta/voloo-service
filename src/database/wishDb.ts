import { Model } from 'mongoose'
import { Wish } from '../entities'
import { WishModel } from './schemas'

export class WishDb {
  private document: Model<WishModel>
  private connectDb: () => Promise<void>

  constructor (document: Model<WishModel>, connectDb: () => Promise<void>) {
    this.document = document
    this.connectDb = connectDb
  }

  create = async (wish: Wish): Promise<Wish> => {
    await this.connectDb()
    throw new Error('Not implemented')
  }

  list = async (): Promise<Wish[]> => {
    await this.connectDb()
    throw new Error('Not implemented')
  }
}
