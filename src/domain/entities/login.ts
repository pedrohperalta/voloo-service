import { InexistentFieldError, InvalidFieldError } from '../errors'
import { isValidEmail } from '../utils'

/* eslint-disable @typescript-eslint/no-explicit-any */
export class Login {
  readonly email: string
  readonly password: string

  constructor(json: any) {
    Login.validate(json)
    this.email = json.email
    this.password = json.password
  }

  static validate(json: any): void {
    if (!json.email) {
      throw new InexistentFieldError('Missing required field email')
    }

    if (!isValidEmail(json.email)) {
      throw new InvalidFieldError('Invalid email')
    }

    if (!json.password) {
      throw new InvalidFieldError('Missing required field password')
    }

    if (!json.password || json.password.length < 8) {
      throw new InvalidFieldError('Password must have at least 8 characters')
    }
  }
}
