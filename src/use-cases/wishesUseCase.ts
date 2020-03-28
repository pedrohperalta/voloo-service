import { ListsDb, WishesDb } from '../database'
import { List, Wish } from '../entities'
import { NotFoundError } from '../errors'
import { filteredJSON } from './utils'

export class WishesUseCase {
  private wishesDb: WishesDb
  private listsDb: ListsDb

  constructor(wishesDb: WishesDb, listsDb: ListsDb) {
    this.wishesDb = wishesDb
    this.listsDb = listsDb
  }

  create = async (listId: string, json: JSON): Promise<Wish> => {
    await this.findList(listId)

    const wish = new Wish(json)
    const created = await this.wishesDb.create(wish)

    await this.listsDb.addWish(listId, created)

    return created
  }

  edit = async (listId: string, wishId: string, json: JSON): Promise<Wish | null> => {
    const filtered = filteredJSON([
      'name',
      'linkUrl',
      'currency',
      'price',
      'comments',
    ], json)

    const list = await this.findList(listId)
    if (!list.contains(wishId)) {
      throw new NotFoundError('Wishlist does not contain this wish')
    }

    const currentWish = await this.findWish(wishId)

    Wish.validate({
      ...currentWish,
      ...filtered,
    })

    return this.wishesDb.edit(wishId, filtered)
  }

  delete = async (listId: string, wishId: string): Promise<void> => {
    const list = await this.findList(listId)
    if (!list.contains(wishId)) {
      throw new NotFoundError('Wishlist does not contain this wish')
    }

    const deletedWish = await this.wishesDb.delete(wishId)
    if (!deletedWish) {
      throw new NotFoundError('Wish does not exist')
    }

    return Promise.resolve()
  }

  private findList = async (id: string): Promise<List> => {
    const list = await this.listsDb.find(id)
    if (!list) {
      throw new NotFoundError('Wishlist does not exist')
    } else {
      return list
    }
  }

  private findWish = async (wishId: string): Promise<Wish> => {
    const wish = await this.wishesDb.find(wishId)
    if (!wish) {
      throw new NotFoundError('Wish does not exist')
    } else {
      return wish
    }
  }
}
