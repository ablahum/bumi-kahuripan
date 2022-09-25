import RoomType from '../models/RoomType.js'

export const showAll = async (req, res, next) => {
  try {
    const roomTypes = await RoomType.find()

    res.status(200).json(roomTypes)
  } catch (err) {
    next(err)
  }
}

export const createOne = async (req, res, next) => {
  const payload = req.body

  try {
    const roomType = new RoomType(payload)
    await roomType.save()

    res.json({
      msg: 'Create room type successful',
      roomType,
    })
  } catch (err) {
    next(err)
  }
}

export const deleteOne = async (req, res, next) => {
  const { id } = req.params

  try {
    const roomType = await RoomType.findByIdAndDelete(id)

    res.json({
      message: 'Delete room type successful',
      roomType,
    })
  } catch (err) {
    next(err)
  }
}
