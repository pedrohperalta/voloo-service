import { SessionRepository } from '../../infra'
import { Session } from '../entities'

export class SessionUseCase {
  private sessionRepo: SessionRepository

  constructor(sessionRepo: SessionRepository) {
    this.sessionRepo = sessionRepo
  }

  findByToken = async (token: string): Promise<Session | null> => {
    return this.sessionRepo.findByToken(token)
  }
}
