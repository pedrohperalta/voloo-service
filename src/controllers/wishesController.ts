import { Request, Response } from 'express'
import { WishesUseCase } from '../use-cases'
import { statusCodeForError } from './utils'

export class WishesController {
  private wishesUseCase: WishesUseCase

  constructor (wishesUseCase: WishesUseCase) {
    this.wishesUseCase = wishesUseCase
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const created = await this.wishesUseCase.create(req.params.id, req.body)
      return res.json(created)
    } catch (error) {
      return res.status(statusCodeForError(error)).json({ error: error.message })
    }
  }
}
