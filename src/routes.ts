import { Router } from 'express'
import { listsController, wishesController } from './controllers'

const routes = Router()

/* Lists API */
routes.get('/lists', listsController.list)
routes.post('/lists', listsController.create)

/* Wishes API */
routes.post('/lists/:id/wishes', wishesController.create)

export default routes
