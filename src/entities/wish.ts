/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmptyFieldError, InexistentFieldError, InvalidFieldError } from '../errors'
import { currencies } from '../utils'

export class Wish {
  readonly id?: string
  readonly name: string
  readonly linkUrl: string | null
  readonly currency: string
  readonly price: number
  readonly comments: string | null

  constructor (json: any) {
    if (!json.name) {
      throw new InexistentFieldError('Wish must have a name')
    }

    if (json.name.trim().length === 0) {
      throw new EmptyFieldError('Wish name cannot be empty')
    }

    if (!json.currency) {
      throw new InexistentFieldError('Wish must have a currency')
    }

    if (Object.keys(currencies).filter(c => c === json.currency).length === 0) {
      throw new InvalidFieldError('Invalid currency')
    }

    if (!json.price) {
      throw new InexistentFieldError('Wish must have a price')
    }

    this.id = json.id
    this.name = json.name
    this.linkUrl = json.linkUrl || null
    this.currency = json.currency
    this.price = json.price
    this.comments = json.comments
  }
}
