import { wishListUseCase, wishUseCase } from '../use-cases'
import { WishController } from './wishController'
import { WishListController } from './wishListController'

export const wishListController = new WishListController(wishListUseCase)
export const wishController = new WishController(wishUseCase)
