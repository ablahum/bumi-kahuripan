import express from 'express'
const router = express.Router()
import { showMe, register, login } from '../controllers/UserController.js'

router.get('/:id', showMe)
router.post('/register', register)
router.post('/login', login)

export default router
