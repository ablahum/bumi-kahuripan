import mongoose from 'mongoose'

const { Schema, model } = mongoose

const consumerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    origin: String,
    ktp: {
      type: String,
      required: true,
    },
    roomType: {
      // type: Schema.Types.ObjectId,
      type: String,
      required: true,
      ref: 'RoomType',
    },
    dayType: {
      // type: Schema.Types.ObjectId,
      type: String,
      required: true,
      ref: 'DayType',
    },
  },
  { timestamps: true }
)

export default model('Consumer', consumerSchema)
