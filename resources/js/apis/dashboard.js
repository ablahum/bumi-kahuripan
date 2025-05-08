import axios from 'axios'

export const getOrderStats = async () => {
  return await axios.get('/dashboard/orders')
}

export const getRoomStats = async () => {
  return await axios.get('/dashboard/rooms')
}
