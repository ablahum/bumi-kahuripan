import Consumer from '../models/Consumer.js'
import fs from 'fs'

export const showAll = async (req, res, next) => {
  try {
    const consumers = await Consumer.find()

    res.status(200).json(consumers)
  } catch (err) {
    next(err)
  }
}

// export const showOne = async (req, res, next) => {
//   const { id } = req.params

//   try {
//     const consumer = await Consumer.findById(id)

//     res.status(200).json(consumer)
//   } catch (err) {
//     next(err)
//   }
// }

export const createOne = async (req, res, next) => {
  const payload = req.body
  const image = req.file

  try {
    const consumer = await new Consumer({ ...payload, ktp: image.filename })
    await consumer.save()

    res.status(201).json({
      msg: 'Create consumer successful',
      consumer,
    })
  } catch (err) {
    console.log(err)
  }
}

export const updateOne = async (req, res, next) => {
  const { id } = req.params
  const payload = req.body
  const image = req.file

  try {
    const consumer = await Consumer.findById(id)
    const currentImage = `public/${consumer.ktp}`

    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage)
    }

    const updatedConsumer = await Consumer.findByIdAndUpdate(id, {
      ...payload,
      ktp: image.filename,
    })

    res.status(200).json({
      msg: 'Update consumer successful',
      updatedConsumer,
    })
  } catch (err) {
    next(err)
  }
}

export const deleteOne = async (req, res, next) => {
  const { id } = req.params

  try {
    const consumer = await Consumer.findByIdAndDelete(id)
    const image = `public/${consumer.ktp}`

    if (fs.existsSync(image)) {
      fs.unlinkSync(image)
    }

    res.status(200).json({
      msg: 'Delete consumer successful',
      consumer,
    })
  } catch (err) {
    next(err)
  }
}
