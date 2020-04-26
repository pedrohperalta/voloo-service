/* eslint-disable @typescript-eslint/no-explicit-any */
export class Session {
  readonly id?: string
  readonly token: string
  readonly userId: string
  readonly loginTime: Date
  readonly lastSeenTime: Date

  constructor(json: any) {
    this.id = json.id
    this.token = json.token
    this.userId = json.userId
    this.loginTime = json.loginTime ?? new Date()
    this.lastSeenTime = json.lastSeenTime ?? new Date()
  }
}
