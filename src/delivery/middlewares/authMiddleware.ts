import { NextFunction, Request, Response } from 'express'
import { sessionUseCase } from '../../domain'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.header('Authorization')
  const components = authHeader?.split(' ')

  if (!components || components.length !== 2) {
    response.status(401).json({ error: 'Invalid authorization header' })
    return
  }

  const token = components[1]

  if (!token) {
    response.status(401).json({ error: 'Missing authorization token' })
    return
  }

  const session = await sessionUseCase.findByToken(token)
  if (!session) {
    response.status(401).json({ error: 'Invalid authorization token' })
    return
  }

  next()
}

export default authMiddleware
