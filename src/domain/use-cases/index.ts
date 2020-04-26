import { listRepository, sessionRepository, userRepository, wishRepository } from '../../infra'
import { ListsUseCase } from './listsUseCase'
import { RegistrationUseCase } from './registrationUseCase'
import { WishesUseCase } from './wishesUseCase'

export * from './listsUseCase'
export * from './registrationUseCase'
export * from './wishesUseCase'

export const listsUseCase = new ListsUseCase(listRepository)
export const registrationUseCase = new RegistrationUseCase(userRepository, sessionRepository)
export const wishesUseCase = new WishesUseCase(wishRepository, listRepository)
