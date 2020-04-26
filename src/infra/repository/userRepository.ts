import { Model } from 'mongoose'
import { User } from '../../domain'
import { UserDbModel } from '../db'

export default class UserRepository {
  private document: Model<UserDbModel>

  constructor(document: Model<UserDbModel>) {
    this.document = document
  }

  create = async (user: User): Promise<User> => {
    const created = await this.document.create(user)

    return {
      ...user,
      id: created.id,
    }
  }
}
