import express from 'express'
import { showAll, createOne, deleteOne } from '../controllers/RoomTypeController.js'

const router = express.Router()

router.get('/', showAll)
router.post('/', createOne)
router.delete('/:id', deleteOne)

export default router
