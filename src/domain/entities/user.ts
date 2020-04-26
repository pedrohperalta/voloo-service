import { InvalidFieldError } from '../errors'
import { isValidEmail } from '../utils'

/* eslint-disable @typescript-eslint/no-explicit-any */
export class User {
  readonly id?: string
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly avatar: string | null
  readonly pwdHash: string
  readonly activationHash: string
  readonly isActive: boolean

  constructor(json: any) {
    User.validate(json)
    this.id = json.id
    this.firstName = json.firstName
    this.lastName = json.lastName
    this.email = json.email
    this.avatar = json.avatar
    this.pwdHash = json.pwdHash
    this.activationHash = json.activationHash
    this.isActive = json.isActive ?? false
  }

  static validate(json: any): void {
    if (!json.firstName || json.firstName.length < 2) {
      throw new InvalidFieldError('Invalid first name')
    }

    if (!json.lastName || json.lastName.length < 2) {
      throw new InvalidFieldError('Invalid last name')
    }

    if (!json.email || !isValidEmail(json.email)) {
      throw new InvalidFieldError('Invalid email')
    }
  }
}
