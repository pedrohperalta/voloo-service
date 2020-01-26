import { Model } from 'mongoose'
import { WishList } from '../entities'
import { WishListModel } from './schemas'

export class WishListDb {
  private document: Model<WishListModel>
  private connectDb: () => Promise<void>

  constructor (document: Model<WishListModel>, connectDb: () => Promise<void>) {
    this.document = document
    this.connectDb = connectDb
  }

  create = async (wishList: WishList): Promise<WishList> => {
    await this.connectDb()

    const created = await this.document.create(wishList)

    return {
      ...wishList,
      id: created.id
    }
  }

  list = async (): Promise<WishList[]> => {
    await this.connectDb()

    const lists = await this.document.find()
    return lists.map(listDb => new WishList(listDb))
  }
}
