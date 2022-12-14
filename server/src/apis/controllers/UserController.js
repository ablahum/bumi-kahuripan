import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

export const showMe = async (req, res, next) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export const register = async (req, res, next) => {
  const payload = req.body
  const { password } = req.body

  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) next(err)

      const newData = new User({
        ...payload,
        password: hash,
      })

      const savedUser = await newData.save()
      res.json({ message: 'Berhasil membuat akun', savedUser })
    })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.json({ message: 'Anda tidak terdaftar. Silakan register terlebih dahulu' })
    } else {
      const hash = user.password
      bcrypt.compare(password, hash, async (err, result) => {
        if (err) next(err)

        if (result) {
          jwt.sign({ email: user.email }, 'JWT_SECRET', (err, token) => {
            if (err) next(err)

            res.json({ message: 'Berhasil masuk', user: { email, token } })
          })
        } else {
          res.json({ message: 'Email atau password salah' })
        }
      })
    }
  } catch (err) {
    next(err)
  }
}

export const logout = async (req, res, next) => {
  try {
    res.json({ message: 'Berhasil logout' })
  } catch (err) {
    next(err)
  }
}
