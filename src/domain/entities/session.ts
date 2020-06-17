import { User } from './user'

/* eslint-disable @typescript-eslint/no-explicit-any */
export class Session {
  readonly id?: string
  readonly token: string
  readonly lastSeenTime: Date
  readonly user: User | undefined

  constructor(json: any) {
    this.id = json.id
    this.token = json.token
    this.lastSeenTime = json.lastSeenTime ?? new Date()
    this.user = json.user ? new User(json.user) : undefined
  }
}
