import { model } from 'mongoose'
import { ListDbModel, SessionDbModel, UserDbModel, WishDbModel } from './model'
import { ListSchema, SessionSchema, UserSchema, WishSchema } from './schema'

export * from './model'

export const listDocument = model<ListDbModel>('List', ListSchema)
export const sessionDocument = model<SessionDbModel>('Session', SessionSchema)
export const userDocument = model<UserDbModel>('User', UserSchema)
export const wishDocument = model<WishDbModel>('Wish', WishSchema)
