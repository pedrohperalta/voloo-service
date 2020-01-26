import { Router } from 'express'
import { wishListController } from './controllers'

const routes = Router()

routes.post('/wish-list', wishListController.create)
routes.get('/wish-list', wishListController.list)

export default routes
