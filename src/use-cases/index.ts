import { listsDb, wishesDb } from '../database'
import { ListsUseCase } from './listsUseCase'
import { WishesUseCase } from './wishesUseCase'

export * from './listsUseCase'
export * from './wishesUseCase'

export const listsUseCase = new ListsUseCase(listsDb)
export const wishesUseCase = new WishesUseCase(wishesDb, listsDb)
