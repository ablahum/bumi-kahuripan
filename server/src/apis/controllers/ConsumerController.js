import fs from 'fs'

import Consumer from '../models/Consumer.js'
import RoomType from '../models/RoomType.js'
import DayType from '../models/DayType.js'

export const getAll = async (req, res, next) => {
  try {
    const consumers = await Consumer.find().populate('roomType').populate('dayType')

    res.status(200).json(consumers)
  } catch (err) {
    next(err)
  }
}

// export const getOne = async (req, res, next) => {
//   const { id } = req.params

//   try {
//     const consumer = await Consumer.findById(id)

//     res.status(200).json(consumer)
//   } catch (err) {
//     next(err)
//   }
// }

export const createOne = async (req, res, next) => {
  let payload = req.body
  const image = req.file

  try {
    if (payload.roomType) {
      const roomType = await RoomType.findOne({
        name: payload.roomType,
      })

      if (roomType) {
        payload = {
          ...payload,
          roomType: roomType._id,
        }
      } else {
        delete payload.roomType
      }
    }

    if (payload.dayType) {
      const dayType = await DayType.findOne({
        name: payload.dayType,
      })

      if (dayType) {
        payload = {
          ...payload,
          dayType: dayType._id,
        }
      } else {
        delete payload.dayType
      }
    }

    const consumer = new Consumer({
      ...payload,
      ktp: image.filename,
    })
    await consumer.save()

    res.status(201).json({
      msg: 'Create consumer successful',
      consumer,
    })
  } catch (err) {
    next(err)
  }
}

export const updateOne = async (req, res, next) => {
  const { id } = req.params
  let payload = req.body
  const image = req.file

  try {
    if (payload.roomType) {
      const roomType = await RoomType.findOne({
        name: payload.roomType,
      })

      if (roomType) {
        payload = {
          ...payload,
          roomType: roomType._id,
        }
      } else {
        delete payload.roomType
      }
    }

    if (payload.dayType) {
      const dayType = await DayType.findOne({
        name: payload.dayType,
      })

      if (dayType) {
        payload = {
          ...payload,
          dayType: dayType._id,
        }
      } else {
        delete payload.dayType
      }
    }

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
