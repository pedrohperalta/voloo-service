import { Request, Response } from 'express'
import { WishUseCase } from '../use-cases'

export class WishController {
  private wishUseCase: WishUseCase

  constructor (wishUseCase: WishUseCase) {
    this.wishUseCase = wishUseCase
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const created = await this.wishUseCase.create(req.params.id, req.body)
      return res.json(created)
    } catch (error) {
      return res.json({ error: error.message })
    }
  }
}
