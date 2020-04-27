import { Request, Response } from 'express'
import { RegistrationUseCase } from '../domain'
import { statusCodeForError } from './utils'

export class RegistrationController {
  private registrationUseCase: RegistrationUseCase

  constructor(registrationUseCase: RegistrationUseCase) {
    this.registrationUseCase = registrationUseCase
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = await this.registrationUseCase.signUp(req.body)
      return res.json({ token })
    } catch (error) {
      return res.status(statusCodeForError(error)).json({ error: error.message })
    }
  }
}
