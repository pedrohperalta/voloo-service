import { connect, wishDocument, wishListDocument } from './schemas'
import { WishDb } from './wishDb'
import { WishListDb } from './wishListDb'

export * from './wishDb'
export * from './wishListDb'

export const wishListDb = new WishListDb(wishListDocument, connect)
export const wishDb = new WishDb(wishDocument, connect)
