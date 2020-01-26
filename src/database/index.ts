import { ListsDb } from './listsDb'
import { connect, listDocument, wishDocument } from './schemas'
import { WishesDb } from './wishesDb'

export * from './listsDb'
export * from './wishesDb'

export const listsDb = new ListsDb(listDocument, connect)
export const wishesDb = new WishesDb(wishDocument, connect)
