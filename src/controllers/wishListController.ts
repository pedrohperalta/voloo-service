import { Request, Response } from 'express'
import wishListUseCase from '../use-cases/wishListUseCase'

class WishListController {
  async create (req: Request, res: Response): Promise<Response> {
    try {
      const created = await wishListUseCase.create(req.body)
      return res.json(created)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async list (req: Request, res: Response): Promise<Response> {
    const lists = await wishListUseCase.list()
    return res.json(lists)
  }
}

export default new WishListController()
