import { UserRepository } from '../../infra'
import { InexistentFieldError, NotFoundError } from '../errors'

export class AccountUseCase {
  private userRepo: UserRepository

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  verify = async (json: JSON): Promise<boolean> => {
    const { activationHash } = json
    if (!activationHash) {
      throw new InexistentFieldError('Could not find the account activation hash')
    }

    const user = await this.userRepo.updateByField('activationHash', activationHash, { isActive: true })
    if (!user) {
      throw new NotFoundError('Invalid activation hash')
    }

    return user.isActive
  }
}
