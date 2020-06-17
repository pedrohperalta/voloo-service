import { NextFunction, Request, Response } from 'express'
import { sessionUseCase } from '../../domain'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization')
  const components = authHeader?.split(' ')

  if (!components || components.length !== 2) {
    res.status(401).json({ error: 'Missing authorization header' })
    return
  }

  const token = components[1]
  if (!token) {
    res.status(401).json({ error: 'Missing authorization token' })
    return
  }

  const session = await sessionUseCase.findByToken(token)
  if (!session) {
    res.status(401).json({ error: 'Invalid authorization token' })
    return
  }

  next()
}
