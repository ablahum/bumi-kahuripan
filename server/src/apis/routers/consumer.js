import express from 'express'
import multer from 'multer'
import { getAll, createOne, updateOne, deleteOne } from '../controllers/ConsumerController.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  },
})

const router = express.Router()
const upload = multer({ storage })

router.get('/', getAll)
router.post('/', upload.single('ktp'), createOne)
router.put('/:id', upload.single('ktp'), updateOne)
router.delete('/:id', deleteOne)

export default router
