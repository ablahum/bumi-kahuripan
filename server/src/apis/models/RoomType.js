import mongoose from 'mongoose'

const { Schema, model } = mongoose

const roomType = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

export default model('RoomType', roomType)
