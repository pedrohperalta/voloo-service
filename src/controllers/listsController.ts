import { Request, Response } from 'express'
import { ListsUseCase } from '../domain'
import { statusCodeForError } from './utils'

export class ListsController {
  private useCase: ListsUseCase

  constructor(useCase: ListsUseCase) {
    this.useCase = useCase
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const created = await this.useCase.create(req.body)
      return res.status(201).json(created)
    } catch (error) {
      return res.status(statusCodeForError(error)).json({ error: error.message })
    }
  }

  list = async (req: Request, res: Response): Promise<Response> => {
    try {
      const lists = await this.useCase.list()
      return res.json(lists)
    } catch (error) {
      return res.status(statusCodeForError(error)).json({ error: error.message })
    }
  }

  edit = async (req: Request, res: Response): Promise<Response> => {
    try {
      const edited = await this.useCase.edit(req.params.id, req.body)
      return res.json(edited)
    } catch (error) {
      return res.status(statusCodeForError(error)).json({ error: error.message })
    }
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      await this.useCase.delete(req.params.id)
      return res.status(204).send()
    } catch (error) {
      return res.status(statusCodeForError(error)).json({ error: error.message })
    }
  }
}
