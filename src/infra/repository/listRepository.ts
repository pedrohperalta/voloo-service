/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose'
import { List, Wish } from '../../entities'
import { ListDbModel } from '../schemas'

export default class ListRepository {
  private document: Model<ListDbModel>

  constructor(document: Model<ListDbModel>) {
    this.document = document
  }

  create = async (list: List): Promise<List> => {
    const created = await this.document.create(list)

    return new List({
      ...list,
      id: created.id,
    })
  }

  list = async (): Promise<List[]> => {
    const lists = await this.document.find().populate('wishes')
    return lists.map(listDb => new List(listDb))
  }

  find = async (id: string): Promise<List | null> => {
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
