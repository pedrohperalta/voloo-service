import { ListsDb } from '../database'
import { List } from '../entities'

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
}
