import { Model } from 'mongoose'
import { Session } from '../../domain'
import { SessionDbModel } from '../db'

export default class SessionRepository {
  private document: Model<SessionDbModel>

  constructor(document: Model<SessionDbModel>) {
    this.document = document
  }

  create = async (session: Session): Promise<Session> => {
    const created = await this.document.create(session)

    return {
      ...session,
      id: created.id,
    }
  }
}
