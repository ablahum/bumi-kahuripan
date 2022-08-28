import Consumer from '../models/Consumer.js'

export const showConsumers = async (req, res, next) => {
  try {
    const consumers = await Consumer.find()
    res.json({ consumers })
  } catch (err) {
    next(err)
  }
}

export const showConsumerById = async (req, res, next) => {
  const { id } = req.params

  try {
    const consumer = await Consumer.findById(id)
    res.json(consumer)
  } catch (err) {
    next(err)
  }
}

export const addConsumer = async (req, res, next) => {
  const payload = req.body
  const newConsumer = new Consumer(payload)

  try {
    const savedConsumer = await newConsumer.save()
    res.json(savedConsumer)
  } catch (err) {
    next(err)
  }
}

export const updateConsumer = async (req, res, next) => {
  const { id } = req.params
  const payload = req.body

  try {
    let updatedConsumer = await Consumer.findByIdAndUpdate(id, payload, { new: true })
    res.json(updatedConsumer)
  } catch (err) {
    next(err)
  }
}

export const deleteConsumer = async (req, res, next) => {
  const { id } = req.params

  try {
    const consumer = await Consumer.findByIdAndDelete(id)
    res.json({
      message: 'Delete consumer successful',
      consumer,
    })
  } catch (err) {
    next(err)
  }
}
