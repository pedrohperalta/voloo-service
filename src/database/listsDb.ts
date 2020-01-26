import { Model } from 'mongoose'
import { List, Wish } from '../entities'
import { ListDbModel } from './schemas'

export class ListsDb {
  private document: Model<ListDbModel>
  private connectDb: () => Promise<void>

  constructor (document: Model<ListDbModel>, connectDb: () => Promise<void>) {
    this.document = document
    this.connectDb = connectDb
  }

  create = async (list: List): Promise<List> => {
    await this.connectDb()

    const created = await this.document.create(list)

    return {
      ...list,
      id: created.id
    }
  }

  list = async (): Promise<List[]> => {
    await this.connectDb()

    const lists = await this.document.find().populate('wishes')
    return lists.map(listDb => new List(listDb))
  }

  find = async (id: string): Promise<List | null> => {
    await this.connectDb()
    const listDb = await this.document.findById(id).populate('wishes')

    if (!listDb) return null

    return new List(listDb)
  }

  addWish = async (id: string, wish: Wish): Promise<List> => {
    await this.connectDb()

    return this.document.findByIdAndUpdate(
      id,
      { $push: { wishes: wish.id } },
      { new: true }
    )
  }
}
