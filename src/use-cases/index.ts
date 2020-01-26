import { wishDb, wishListDb } from '../database'
import { WishListUseCase } from './wishListUseCase'
import { WishUseCase } from './wishUseCase'

export * from './wishListUseCase'
export * from './wishUseCase'

export const wishListUseCase = new WishListUseCase(wishListDb)
export const wishUseCase = new WishUseCase(wishDb, wishListDb)
