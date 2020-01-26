import { Request, Response } from 'express'
import { ListsUseCase } from '../use-cases'

export class ListsController {
  private useCase: ListsUseCase

  constructor (useCase: ListsUseCase) {
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
