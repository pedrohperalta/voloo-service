/* eslint-disable @typescript-eslint/no-explicit-any */
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

  updateByField = async <T>(field: string, value: T, updatedEntries: any): Promise<User | null> => {
    const updatedUser = await this.document.findOneAndUpdate(
      { [field]: value },
      { $set: updatedEntries },
      { new: true },
    )

    if (!updatedUser) {
      return null
    }

    return new User(updatedUser)
  }

  findByEmail = async (email: string): Promise<User | null> => {
    const userDb = await this.document.findOne({ email })

    if (!userDb) {
      return null
    }

    return new User(userDb)
  }
}
