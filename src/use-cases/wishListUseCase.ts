import WishList from '../entities/wishList'
import WishListSchema from '../schemas/wishListSchema'

class WishListUseCase {
  async create (json: JSON): Promise<WishList> {
    const wishList = new WishList(json)
    const created = await WishListSchema.create(wishList)

    return {
      ...wishList,
      id: created.id
    }
  }

  async list (): Promise<WishList[]> {
    const lists = await WishListSchema.find()
    return lists.map(listDb => new WishList(listDb))
  }
}

export default new WishListUseCase()
