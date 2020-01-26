import { ListsDb, WishesDb } from '../database'
import { Wish } from '../entities'

export class WishesUseCase {
  private wishesDb: WishesDb
  private listsDb: ListsDb

  constructor (wishesDb: WishesDb, listsDb: ListsDb) {
    this.wishesDb = wishesDb
    this.listsDb = listsDb
  }

  create = async (listId: string, json: JSON): Promise<Wish> => {
    const wish = await this.wishesDb.create(new Wish(json))
    await this.listsDb.addWish(listId, wish)

    return wish
  }
}
