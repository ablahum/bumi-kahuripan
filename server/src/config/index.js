import dotenv from 'dotenv'

dotenv.config()
const data = {
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
}

export default data
