import { Router } from 'express'
import { authMiddleware } from '../delivery/middlewares'
import { accountController, listsController, registrationController, wishesController } from './controllers'

const routes = Router()

/* Registration API */
routes.post('/login', registrationController.login)
routes.post('/register', registrationController.signUp)

/* Account API */
routes.post('/account/verify', accountController.verify)

/* Lists API */
routes.get('/lists', authMiddleware, listsController.list)
routes.post('/lists', authMiddleware, listsController.create)
routes.patch('/lists/:id', authMiddleware, listsController.edit)
routes.delete('/lists/:id', authMiddleware, listsController.delete)

/* Wishes API */
routes.post('/lists/:id/wishes', authMiddleware, wishesController.create)
routes.patch('/lists/:listId/wishes/:wishId', authMiddleware, wishesController.edit)
routes.delete('/lists/:listId/wishes/:wishId', authMiddleware, wishesController.delete)

export default routes
