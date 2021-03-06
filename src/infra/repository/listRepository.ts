/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose'
import { List, Wish } from '../../domain'
import { ListDbModel } from '../db'

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
    return listDb ? new List(listDb) : null
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

    return edited ? new List(edited) : null
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
    return deleted ? new List(deleted) : null
  }
}
