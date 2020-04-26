import { listDocument, sessionDocument, userDocument, wishDocument } from './db'
import { ListRepository, SessionRepository, UserRepository, WishRepository } from './repository'

export * from './repository'

export const listRepository = new ListRepository(listDocument)
export const sessionRepository = new SessionRepository(sessionDocument)
export const userRepository = new UserRepository(userDocument)
export const wishRepository = new WishRepository(wishDocument)
