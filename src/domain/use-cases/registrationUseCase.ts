import bcrypt from 'bcrypt'
import { SessionRepository, UserRepository } from '../../infra'
import { Login, Session, SignUp, User } from '../entities'
import { ConflictError, UnauthorizedError } from '../errors'
import { generateRandomString } from '../utils'

export class RegistrationUseCase {
  private userRepo: UserRepository
  private sessionRepo: SessionRepository

  constructor(userRepo: UserRepository, sessionRepo: SessionRepository) {
    this.userRepo = userRepo
    this.sessionRepo = sessionRepo
  }

  login = async (json: JSON): Promise<string> => {
    const { email, password } = new Login(json)

    const user = await this.userRepo.findByField('email', email)
    if (!user) {
      throw new UnauthorizedError('invalid email')
    }

    const match = await bcrypt.compare(password, user.pwdHash)
    if (!match) {
      throw new UnauthorizedError('invalid password')
    }

    const { token } = await this.createSession(user.id)

    return token
  }

  signUp = async (json: JSON): Promise<string> => {
    const { firstName, lastName, email, password } = new SignUp(json)

    const existingUser = await this.userRepo.findByField('email', email)
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
    const { token } = await this.createSession(id)

    return token
  }

  private createSession = async (userId: string): Promise<Session> => {
    const session = new Session({
      token: generateRandomString(32),
      userId,
    })

    return this.sessionRepo.create(session)
  }
}
