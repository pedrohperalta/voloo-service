import { InexistentFieldError, InvalidFieldError } from '../errors'
import { isValidEmail } from '../utils'

/* eslint-disable @typescript-eslint/no-explicit-any */
export class SignUp {
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly password: string

  constructor(json: any) {
    SignUp.validate(json)
    this.firstName = json.firstName
    this.lastName = json.lastName
    this.email = json.email
    this.password = json.password
  }

  static validate(json: any): void {
    if (!json.firstName) {
      throw new InexistentFieldError('Missing required field firstName')
    }

    if (json.firstName.length < 2) {
      throw new InvalidFieldError('Invalid first name')
    }

    if (!json.lastName) {
      throw new InexistentFieldError('Missing required field lastName')
    }

    if (json.lastName.length < 2) {
      throw new InvalidFieldError('Invalid last name')
    }

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
