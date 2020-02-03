import { Router } from 'express'
import { listsController, wishesController } from './controllers'

const routes = Router()

/* Lists API */
routes.get('/lists', listsController.list)
routes.post('/lists', listsController.create)
routes.patch('/lists/:id', listsController.edit)

/* Wishes API */
routes.post('/lists/:id/wishes', wishesController.create)
routes.patch('/lists/:listId/wishes/:wishId', wishesController.edit)

export default routes
