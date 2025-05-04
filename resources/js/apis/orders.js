import axios from 'axios'

export const getAll = async () => {
  return await axios.get('/orders')
}

export const createOne = async (payload) => {
  return await axios.post('/orders', payload)
}

export const updateOne = async (id, payload) => {
  payload.append('_method', 'PUT')
  return await axios.post(`/orders/${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteOne = async (id) => {
  return await axios.delete(`/orders/${id}`)
}
