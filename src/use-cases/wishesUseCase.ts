import { ListsDb, WishesDb } from '../database'
import { Wish } from '../entities'
import { NotFoundError } from '../errors'

export class WishesUseCase {
  private wishesDb: WishesDb
  private listsDb: ListsDb

  constructor (wishesDb: WishesDb, listsDb: ListsDb) {
    this.wishesDb = wishesDb
    this.listsDb = listsDb
  }

  create = async (listId: string, json: JSON): Promise<Wish> => {
    const list = await this.listsDb.find(listId)
    if (!list) {
      throw new NotFoundError('Wishlist does not exist')
    }

    const wish = new Wish(json)
    const created = await this.wishesDb.create(wish)

    await this.listsDb.addWish(listId, created)

    return wish
  }
}
