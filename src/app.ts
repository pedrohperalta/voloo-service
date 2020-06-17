import cors from 'cors'
import express from 'express'
import routes from './delivery/routes'
import Database from './infra/mongoose'

export default class App {
  private webServer: express.Application
  private port: number
  private database: Database

  constructor(webServer: express.Application, port: number, database: Database) {
    this.webServer = webServer
    this.port = port
    this.database = database
  }

  private setupMiddlewares = (): void => {
    this.webServer.use(express.json())
    this.webServer.use(cors())
  }

  private setupRoutes = (): void => {
    this.webServer.use(routes)
  }

  private connectDatabase = (): Promise<void> => {
    return this.database.connect()
  }

  setup = async (): Promise<App> => {
    this.setupMiddlewares()
    this.setupRoutes()
    await this.connectDatabase()

    return this
  }

  listen = (): void => {
    this.webServer.listen(this.port)
  }
}
