import ListRepository from './repository/listRepository'
import WishRepository from './repository/wishRepository'
import { listDocument, wishDocument } from './schemas'

export const listRepository = new ListRepository(listDocument)
export const wishRepository = new WishRepository(wishDocument)
