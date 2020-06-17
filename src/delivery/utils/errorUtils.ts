import { EmptyFieldError, InexistentFieldError, NotFoundError, UnauthorizedError } from '../../domain'

export const statusCodeForError = (error: Error): number => {
  let code: number

  switch (error.constructor) {
    case UnauthorizedError:
      code = 401
      break

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

  return code
}
