import mongoose from 'mongoose'
import data from '../config/index.js'

const { connect } = mongoose
const { dbUser, dbPass, dbHost, dbName } = data

const db = async () => {
  try {
    connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}.baw8glc.mongodb.net/${dbName}?retryWrites=true&w=majority`)
  } catch (err) {
    throw err
  }
}

export default db
