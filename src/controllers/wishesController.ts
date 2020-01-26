import { Request, Response } from 'express'
import { WishesUseCase } from '../use-cases'
import { NotFoundError, InexistentFieldError, EmptyFieldError } from '../errors'

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
      let code: number

      switch (error.constructor) {
        case NotFoundError:
          code = 404
          break

        case InexistentFieldError:
        case EmptyFieldError:
          code = 422
          break

        default:
          code = 400
          break
      }

      return res.status(code).json({ error: error.message })
    }
  }
}
