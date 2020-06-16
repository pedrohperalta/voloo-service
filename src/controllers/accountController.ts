import { Request, Response } from 'express'
import { AccountUseCase } from '../domain'
import { statusCodeForError } from './utils'

export class AccountController {
  private accountUseCase: AccountUseCase

  constructor(accountUseCase: AccountUseCase) {
    this.accountUseCase = accountUseCase
  }

  verify = async (req: Request, res: Response): Promise<Response> => {
    try {
      await this.accountUseCase.verify(req.body)
      return res.json({ message: 'account successfully activated' })
    } catch (error) {
      return res.status(statusCodeForError(error)).json({ error: error.message })
    }
  }
}
