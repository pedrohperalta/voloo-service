import { Router } from 'express'
import WishListController from './controllers/wishListController'

const routes = Router()

routes.post('/wish-list', WishListController.create)
routes.get('/wish-list', WishListController.list)

export default routes
