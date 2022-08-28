import express from 'express'
const router = express.Router()
import { showConsumers, showConsumerById, addConsumer, updateConsumer, deleteConsumer } from '../controllers/ConsumerController.js'

router.get('/', showConsumers)
router.get('/:id', showConsumerById)
router.post('/', addConsumer)
router.put('/:id', updateConsumer)
router.delete('/:id', deleteConsumer)

export default router
