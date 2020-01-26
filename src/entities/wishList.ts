/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmptyFieldError, InexistentFieldError, InvalidFieldError } from '../errors'

const availableCategories = [
  'birthday',
  'books',
  'clothes',
  'gadgets',
  'games',
  'others',
  'sports',
  'trip',
  'toys',
  'wedding'
]

export class WishList {
  readonly id?: string
  readonly name: string
  readonly category: string
  readonly isPrivate: boolean

  constructor (json: any) {
    if (!json.name) {
      throw new InexistentFieldError('Wishlist must have a name')
    }

    if (json.name.trim().length === 0) {
      throw new EmptyFieldError('WishList name cannot be empty')
    }

    if (!json.category) {
      throw new InexistentFieldError('Wishlist must have a category')
    }

    if (availableCategories.filter(c => c === json.category).length === 0) {
      throw new InvalidFieldError('Invalid category')
    }

    this.id = json.id
    this.name = json.name
    this.category = json.category
    this.isPrivate = json.isPrivate || false
  }
}
