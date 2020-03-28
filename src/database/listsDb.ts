/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose'
import { List, Wish } from '../entities'
import { ListDbModel } from './schemas'

export class ListsDb {
  private document: Model<ListDbModel>
  private connectDb: () => Promise<void>

  constructor(document: Model<ListDbModel>, connectDb: () => Promise<void>) {
    this.document = document
    this.connectDb = connectDb
  }

  create = async (list: List): Promise<List> => {
    await this.connectDb()

    const created = await this.document.create(list)

    return new List({
      ...list,
      id: created.id,
    })
  }

  list = async (): Promise<List[]> => {
    await this.connectDb()

    const lists = await this.document.find().populate('wishes')
    return lists.map(listDb => new List(listDb))
  }

  find = async (id: string): Promise<List | null> => {
    await this.connectDb()

    if (!Types.ObjectId.isValid(id)) {
      return null
    }

    const listDb = await this.document.findById(id).populate('wishes')
    if (!listDb) {
      return null
    }

    return new List(listDb)
  }

  edit = async (id: string, newList: {[key: string]: any}): Promise<List | null> => {
    await this.connectDb()

    if (!Types.ObjectId.isValid(id)) {
      return null
    }

    const edited = await this.document.findByIdAndUpdate(
      id,
      { $set: newList },
      { new: true },
    ).populate('wishes')

    if (!edited) {
      return null
    }

    return new List(edited)
  }

  addWish = async (id: string, wish: Wish): Promise<List> => {
    await this.connectDb()

    const edited = await this.document.findByIdAndUpdate(
      id,
      { $push: { wishes: wish.id } },
      { new: true },
    ).populate('wishes')

    return new List(edited)
  }

  delete = async (id: string): Promise<List | null> => {
    const deleted = await this.document.findByIdAndDelete(id).populate('wishes')
    if (!deleted) {
      return null
    }

    return new List(deleted)
  }
}
