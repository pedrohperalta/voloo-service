import { listsUseCase, registrationUseCase, wishesUseCase } from '../domain'
import { ListsController } from './listsController'
import { RegistrationController } from './registrationController'
import { WishesController } from './wishesController'

export const listsController = new ListsController(listsUseCase)
export const registrationController = new RegistrationController(registrationUseCase)
export const wishesController = new WishesController(wishesUseCase)
