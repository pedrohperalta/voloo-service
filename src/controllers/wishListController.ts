import { Request, Response } from 'express'
import { WishListUseCase } from '../use-cases'

export class WishListController {
  private useCase: WishListUseCase

  constructor (useCase: WishListUseCase) {
    this.useCase = useCase
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const created = await this.useCase.create(req.body)
      return res.json(created)
    } catch (error) {
      return res.json({ error: error.message })
    }
  }

  list = async (req: Request, res: Response): Promise<Response> => {
    try {
      const lists = await this.useCase.list()
      return res.json(lists)
    } catch (error) {
      return res.json({ error: error.message })
    }
  }
}
