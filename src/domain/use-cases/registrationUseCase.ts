import bcrypt from 'bcrypt'
import { SessionRepository, UserRepository } from '../../infra'
import { Session, SignUp, User } from '../entities'
import { ConflictError } from '../errors'
import { generateRandomString } from '../utils'

export class RegistrationUseCase {
  private userRepo: UserRepository
  private sessionRepo: SessionRepository

  constructor(userRepo: UserRepository, sessionRepo: SessionRepository) {
    this.userRepo = userRepo
    this.sessionRepo = sessionRepo
  }

  signUp = async (json: JSON): Promise<string> => {
    const { firstName, lastName, email, password } = new SignUp(json)

    const existingUser = await this.userRepo.findByEmail(email)
    if (existingUser) {
      throw new ConflictError('There is an account already registered with this email')
    }

    const salt = await bcrypt.genSalt()
    const pwdHash = await bcrypt.hash(password, salt)
    const user = new User({
      firstName,
      lastName,
      email,
      pwdHash,
      activationHash: generateRandomString(32),
    })

    const { id } = await this.userRepo.create(user)
    const session = new Session({
      token: generateRandomString(32),
      userId: id,
    })

    await this.sessionRepo.create(session)

    return session.token
  }
}
