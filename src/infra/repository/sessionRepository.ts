import { Model } from 'mongoose'
import { Session } from '../../domain'
import { SessionDbModel } from '../db'

export default class SessionRepository {
  private document: Model<SessionDbModel>

  constructor(document: Model<SessionDbModel>) {
    this.document = document
  }

  create = async (session: Session, userId: string): Promise<Session> => {
    return this.document.create({ ...session, user: userId })
  }

  findByToken = async (token: string): Promise<Session | null> => {
    const sessionDb = await this.document.findOne({ token }).populate('user')
    return sessionDb ? new Session(sessionDb) : null
  }
}
