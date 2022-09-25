import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import logger from 'morgan'
import db from './src/db/index.js'
import path from 'path'
import { fileURLToPath } from 'url'

import user from './src/apis/routers/user.js'
import consumer from './src/apis/routers/consumer.js'
import roomType from './src/apis/routers/roomType.js'
import dayType from './src/apis/routers/dayType.js'

const app = express()
dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cookieParser())
app.use(logger('dev'))
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/auth', user)
app.use('/api/consumers', consumer)
app.use('/api/roomtype', roomType)
app.use('/api/daytype', dayType)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong.'

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

app.listen(process.env.PORT || 4000, () => {
  db()
})
