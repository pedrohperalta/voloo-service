import { ListsDb, WishesDb } from '../database'
import { Wish } from '../entities'
import { NotFoundError } from '../errors'
import { filteredJSON } from './utils'

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

  edit = async (listId: string, wishId: string, json: JSON): Promise<Wish | null> => {
    const filtered = filteredJSON([
      'name',
      'linkUrl',
      'currency',
      'price',
      'comments'
    ], json)

    const list = await this.listsDb.find(listId)
    if (!list) {
      throw new NotFoundError('Wishlist does not exist')
    }

    if (list.wishes.map(w => w.id).filter(id => id === wishId).length === 0) {
      throw new NotFoundError('Wishlist does not contain this wish')
    }

    const currentWish = await this.wishesDb.find(wishId)
    if (!currentWish) {
      throw new NotFoundError('Wish does not exist')
    }

    Wish.validate({
      ...currentWish,
      ...filtered
    })

    return this.wishesDb.edit(wishId, filtered)
  }
}
