import { wishListDb } from '../database'
import { WishListUseCase } from './wishListUseCase'

export * from './wishListUseCase'

export const wishListUseCase = new WishListUseCase(wishListDb)
