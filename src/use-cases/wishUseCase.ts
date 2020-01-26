import { WishDb, WishListDb } from '../database'
import { Wish } from '../entities'

export class WishUseCase {
  private wishDb: WishDb
  private wishListDb: WishListDb

  constructor (wishDb: WishDb, wishListDb: WishListDb) {
    this.wishDb = wishDb
    this.wishListDb = wishListDb
  }

  create = async (wishListId: string, json: JSON): Promise<Wish> => {
    const wish = await this.wishDb.create(new Wish(json))
    await this.wishListDb.addWish(wishListId, wish)

    return wish
  }
}
