import cors from 'cors'
import express from 'express'
import routes from './routes'

export default class App {
  private webServer: express.Application
  private port: number

  constructor(webServer: express.Application, port: number) {
    this.webServer = webServer
    this.port = port
    this.setupMiddlewares()
    this.setupRoutes()
  }

  private setupMiddlewares = (): void => {
    this.webServer.use(express.json())
    this.webServer.use(cors())
  }

  private setupRoutes = (): void => {
    this.webServer.use(routes)
  }

  listen = (): void => {
    this.webServer.listen(this.port)
  }
}
