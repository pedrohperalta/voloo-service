import { WishListDb } from '../database'
import { WishList } from '../entities'

export class WishListUseCase {
  private db: WishListDb

  constructor (db: WishListDb) {
    this.db = db
  }

  create = async (json: JSON): Promise<WishList> => {
    const wishList = new WishList(json)
    return this.db.create(wishList)
  }

  list = async (): Promise<WishList[]> => {
    return this.db.list()
  }
}
