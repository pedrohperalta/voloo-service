import { ListsDb } from '../database'
import { List } from '../entities'
import { NotFoundError } from '../errors'
import { filteredJSON } from './utils'

export class ListsUseCase {
  private db: ListsDb

  constructor (db: ListsDb) {
    this.db = db
  }

  create = async (json: JSON): Promise<List> => {
    const list = new List(json)
    return this.db.create(list)
  }

  list = async (): Promise<List[]> => {
    return this.db.list()
  }

  edit = async (id: string, json: JSON): Promise<List | null> => {
    const filtered = filteredJSON([
      'name',
      'category',
      'isPrivate'
    ], json)

    const currentList = await this.db.find(id)
    if (!currentList) {
      throw new NotFoundError('Wishlist does not exist')
    }

    List.validate({
      ...currentList,
      ...filtered
    })

    return this.db.edit(id, filtered)
  }

  delete = async (id: string): Promise<void> => {
    const deletedList = await this.db.delete(id)
    if (!deletedList) {
      throw new NotFoundError('Wishlist does not exist')
    }

    return Promise.resolve()
  }
}
