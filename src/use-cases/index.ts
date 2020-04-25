import { listRepository, wishRepository } from '../infra'
import { ListsUseCase } from './listsUseCase'
import { WishesUseCase } from './wishesUseCase'

export * from './listsUseCase'
export * from './wishesUseCase'

export const listsUseCase = new ListsUseCase(listRepository)
export const wishesUseCase = new WishesUseCase(wishRepository, listRepository)
