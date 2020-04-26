import { listsUseCase, wishesUseCase } from '../domain'
import { ListsController } from './listsController'
import { WishesController } from './wishesController'

export const listsController = new ListsController(listsUseCase)
export const wishesController = new WishesController(wishesUseCase)
