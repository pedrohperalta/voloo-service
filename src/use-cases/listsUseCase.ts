import { ListsDb } from '../database'
import { List } from '../entities'
import { NotFoundError } from '../errors'

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
    const editableFields = ['name', 'category', 'isPrivate']

    const filtered = Object.keys(json)
      .filter(key => editableFields.includes(key))
      .map((key: string) => {
        const obj = {}
        obj[key] = json[key]
        return obj
      })
      .reduce((previous, current) => ({
        ...previous,
        ...current
      }), {})

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
}
