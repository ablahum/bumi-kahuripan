import mongoose from 'mongoose'

const { connect } = mongoose

const db = async () => {
  try {
    connect(process.env.MONGO_URI)
  } catch (err) {
    throw err
  }
}

export default db
