import { listRepository, sessionRepository, userRepository, wishRepository } from '../../infra'
import { AccountUseCase } from './accountUseCase'
import { ListsUseCase } from './listsUseCase'
import { RegistrationUseCase } from './registrationUseCase'
import { SessionUseCase } from './sessionUseCase'
import { WishesUseCase } from './wishesUseCase'

export * from './accountUseCase'
export * from './listsUseCase'
export * from './registrationUseCase'
export * from './sessionUseCase'
export * from './wishesUseCase'

export const accountUseCase = new AccountUseCase(userRepository)
export const listsUseCase = new ListsUseCase(listRepository)
export const registrationUseCase = new RegistrationUseCase(userRepository, sessionRepository)
export const sessionUseCase = new SessionUseCase(sessionRepository)
export const wishesUseCase = new WishesUseCase(wishRepository, listRepository)
