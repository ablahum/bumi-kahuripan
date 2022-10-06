import express from 'express'
import { getAll, createOne, deleteOne } from '../controllers/RoomTypeController.js'

const router = express.Router()

router.get('/', getAll)
router.post('/', createOne)
router.delete('/:id', deleteOne)

export default router
