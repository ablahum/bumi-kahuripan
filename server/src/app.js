import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import db from './db/index.js'

import user from './apis/routes/user.js'
import consumer from './apis/routes/consumer.js'

const app = express()
dotenv.config()

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(morgan('dev'))

app.use('/auth', user)
app.use('/api/consumers', consumer)

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
