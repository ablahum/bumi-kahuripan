import express from 'express'
import { showMe, register, login, logout } from '../controllers/UserController.js'

const router = express.Router()

router.get('/:id', showMe)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

export default router
