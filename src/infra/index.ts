import { listDocument, wishDocument } from './db'
import { ListRepository, WishRepository } from './repository'

export * from './repository'

export const listRepository = new ListRepository(listDocument)
export const wishRepository = new WishRepository(wishDocument)
