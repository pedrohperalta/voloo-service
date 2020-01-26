import { wishListUseCase } from '../use-cases'
import { WishListController } from './wishListController'

export const wishListController = new WishListController(wishListUseCase)
