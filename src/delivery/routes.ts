import { Router } from 'express'
import { accountController, listsController, registrationController, wishesController } from './controllers'

const routes = Router()

/* Registration API */
routes.post('/login', registrationController.login)
routes.post('/register', registrationController.signUp)

/* Account API */
routes.post('/account/verify', accountController.verify)

/* Lists API */
routes.get('/lists', listsController.list)
routes.post('/lists', listsController.create)
routes.patch('/lists/:id', listsController.edit)
routes.delete('/lists/:id', listsController.delete)

/* Wishes API */
routes.post('/lists/:id/wishes', wishesController.create)
routes.patch('/lists/:listId/wishes/:wishId', wishesController.edit)
routes.delete('/lists/:listId/wishes/:wishId', wishesController.delete)

export default routes