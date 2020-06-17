import { accountUseCase, listsUseCase, registrationUseCase, wishesUseCase } from '../../domain'
import { AccountController } from './accountController'
import { ListsController } from './listsController'
import { RegistrationController } from './registrationController'
import { WishesController } from './wishesController'

export const accountController = new AccountController(accountUseCase)
export const listsController = new ListsController(listsUseCase)
export const registrationController = new RegistrationController(registrationUseCase)
export const wishesController = new WishesController(wishesUseCase)
