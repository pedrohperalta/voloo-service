import App from './app'
import express from 'express'

require('dotenv').config()

const webServer = express()
const port = process.env.SERVER_PORT
const app = new App(webServer, Number(port))

app.listen()
