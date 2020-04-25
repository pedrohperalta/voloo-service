import { List, Wish } from '../entities'
import { NotFoundError } from '../errors'
import ListRepository from '../infra/repository/listRepository'
import WishRepository from '../infra/repository/wishRepository'
import { filteredJSON } from './utils'

export class WishesUseCase {
  private wishRepo: WishRepository
  private listRepo: ListRepository

  constructor(wishRepo: WishRepository, listRepo: ListRepository) {
    this.wishRepo = wishRepo
    this.listRepo = listRepo
  }

  create = async (listId: string, json: JSON): Promise<Wish> => {
    await this.findList(listId)

    const wish = new Wish(json)
    const created = await this.wishRepo.create(wish)

    await this.listRepo.addWish(listId, created)

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

    return this.wishRepo.edit(wishId, filtered)
  }

  delete = async (listId: string, wishId: string): Promise<void> => {
    const list = await this.findList(listId)
    if (!list.contains(wishId)) {
      throw new NotFoundError('Wishlist does not contain this wish')
    }

    const deletedWish = await this.wishRepo.delete(wishId)
    if (!deletedWish) {
      throw new NotFoundError('Wish does not exist')
    }

    return Promise.resolve()
  }

  private findList = async (id: string): Promise<List> => {
    const list = await this.listRepo.find(id)
    if (!list) {
      throw new NotFoundError('Wishlist does not exist')
    } else {
      return list
    }
  }

  private findWish = async (wishId: string): Promise<Wish> => {
    const wish = await this.wishRepo.find(wishId)
    if (!wish) {
      throw new NotFoundError('Wish does not exist')
    } else {
      return wish
    }
  }
}
