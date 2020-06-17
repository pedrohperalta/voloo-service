import { Request, Response } from 'express'
import { RegistrationUseCase } from '../domain'
import { statusCodeForError } from './utils'

export class RegistrationController {
  private registrationUseCase: RegistrationUseCase

  constructor(registrationUseCase: RegistrationUseCase) {
    this.registrationUseCase = registrationUseCase
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = await this.registrationUseCase.login(req.body)
      return res.json({ token })
    } catch (error) {
      return res.status(statusCodeForError(error)).json({ error: error.message })
    }
  }

  signUp = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = await this.registrationUseCase.signUp(req.body)
      return res.json({ token })
    } catch (error) {
      return res.status(statusCodeForError(error)).json({ error: error.message })
    }
  }
}
