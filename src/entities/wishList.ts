/* eslint-disable @typescript-eslint/no-explicit-any */
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

export default class WishList {
  readonly id?: string
  readonly name: string
  readonly category: string
  readonly isPrivate: boolean

  constructor (json: any) {
    if (!json.name) {
      throw new Error('Wishlist must have a name')
    }

    if (json.name.trim().length === 0) {
      throw new Error('WishList name cannot be empty')
    }

    if (!json.category) {
      throw new Error('Wishlist must have a category')
    }

    if (availableCategories.filter(c => c === json.category).length === 0) {
      throw new Error('Invalid category')
    }

    this.id = json.id
    this.name = json.name
    this.category = json.category
    this.isPrivate = json.isPrivate || false
  }
}
