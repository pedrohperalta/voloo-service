import { Model } from 'mongoose'
import { WishList, Wish } from '../entities'
import { WishListDbModel } from './schemas'

export class WishListDb {
  private document: Model<WishListDbModel>
  private connectDb: () => Promise<void>

  constructor (document: Model<WishListDbModel>, connectDb: () => Promise<void>) {
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

    const lists = await this.document.find().populate('wishes')
    return lists.map(listDb => new WishList(listDb))
  }

  addWish = async (id: string, wish: Wish): Promise<WishList> => {
    await this.connectDb()

    return this.document.findByIdAndUpdate(
      id,
      { $push: { wishes: wish.id } },
      { new: true }
    )
  }
}
