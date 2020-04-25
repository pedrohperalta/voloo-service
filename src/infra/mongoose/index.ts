import mongoose, { STATES } from 'mongoose'

require('dotenv').config()

const url = process.env.DB_URL
const dbName = process.env.DB_NAME

export default interface Database {
  connect: () => Promise<void>
}

class MongooseDatabase implements Database {
  connect = async (): Promise<void> => {
    if (mongoose.connection.readyState === STATES.connected) {
      return
    }

    await mongoose.connect(`${url}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
  }
}

export const database = new MongooseDatabase()
