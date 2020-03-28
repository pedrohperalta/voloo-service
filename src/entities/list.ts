/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmptyFieldError, InexistentFieldError, InvalidFieldError } from '../errors'
import { Wish } from './wish'

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
  'wedding',
]

export class List {
  readonly id?: string
  readonly name: string
  readonly category: string
  readonly isPrivate: boolean
  readonly wishes: Wish[]

  constructor(json: any) {
    List.validate(json)
    this.id = json.id
    this.name = json.name
    this.category = json.category
    this.isPrivate = json.isPrivate || false
    this.wishes = json.wishes?.map(w => new Wish(w))
  }

  static validate(json: any): void {
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
  }

  contains(wishId: string): boolean {
    return this.wishes.map(w => w.id).filter(id => id === wishId).length !== 0
  }
}
