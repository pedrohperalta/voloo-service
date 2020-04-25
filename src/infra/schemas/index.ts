import { model } from 'mongoose'
import { ListDbModel, ListSchema } from './listSchema'
import { WishDbModel, WishSchema } from './wishSchema'

export * from './listSchema'
export * from './wishSchema'

export const listDocument = model<ListDbModel>('List', ListSchema)
export const wishDocument = model<WishDbModel>('Wish', WishSchema)
