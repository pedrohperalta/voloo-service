import { ListRepository } from '../../infra'
import { List } from '../entities'
import { NotFoundError } from '../errors'
import { filteredJSON } from '../utils'

export class ListsUseCase {
  private repo: ListRepository

  constructor(db: ListRepository) {
    this.repo = db
  }

  create = async (json: JSON): Promise<List> => {
    const list = new List(json)
    return this.repo.create(list)
  }

  list = async (): Promise<List[]> => {
    return this.repo.list()
  }

  edit = async (id: string, json: JSON): Promise<List | null> => {
    const filtered = filteredJSON([
      'name',
      'category',
      'isPrivate',
    ], json)

    const currentList = await this.repo.find(id)
    if (!currentList) {
      throw new NotFoundError('Wishlist does not exist')
    }

    List.validate({
      ...currentList,
      ...filtered,
    })

    return this.repo.edit(id, filtered)
  }

  delete = async (id: string): Promise<void> => {
    const deletedList = await this.repo.delete(id)
    if (!deletedList) {
      throw new NotFoundError('Wishlist does not exist')
    }

    return Promise.resolve()
  }
}
