import express from 'express'
import App from './app'
import { database } from './infra/mongoose'

require('dotenv').config()

const webServer = express()
const port = process.env.SERVER_PORT

new App(webServer, Number(port), database).setup().then(app => app.listen())
