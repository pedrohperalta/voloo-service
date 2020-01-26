import { Router } from 'express'
import { wishListController, wishController } from './controllers'

const routes = Router()

routes.get('/wish-list', wishListController.list)
routes.post('/wish-list', wishListController.create)
routes.post('/wish-list/:id/wishes', wishController.create)

export default routes
