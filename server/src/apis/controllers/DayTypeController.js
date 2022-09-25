import DayType from '../models/DayType.js'

export const showAll = async (req, res, next) => {
  try {
    const dayTypes = await DayType.find()

    res.status(200).json(dayTypes)
  } catch (err) {
    next(err)
  }
}

export const createOne = async (req, res, next) => {
  const payload = req.body

  try {
    const dayType = new DayType(payload)
    await dayType.save()

    res.json({
      msg: 'Create room type successful',
      dayType,
    })
  } catch (err) {
    next(err)
  }
}

export const deleteOne = async (req, res, next) => {
  const { id } = req.params

  try {
    const dayType = await DayType.findByIdAndDelete(id)

    res.json({
      message: 'Delete day type successful',
      dayType,
    })
  } catch (err) {
    next(err)
  }
}
