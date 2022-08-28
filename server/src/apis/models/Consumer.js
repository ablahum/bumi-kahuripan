import mongoose from 'mongoose'
const { Schema, model } = mongoose

const ConsumerSchema = new Schema(
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
  },
  { timestamps: true }
)

export default model('Consumer', ConsumerSchema)
