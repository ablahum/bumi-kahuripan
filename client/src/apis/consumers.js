import axios from 'axios'
import { config } from '../config'

export const showAll = async () => {
  return await axios.get(`${config.api_host}/api/consumers`)
}

// export const showOne = async (id) => {
//   return await axios.get(`${config.api_host}/api/consumers/${id}`)
// }

export const createOne = async (payload) => {
  return await axios.post(`${config.api_host}/api/consumers`, payload, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  })
}

export const updateOne = async (id, payload) => {
  return await axios.put(`${config.api_host}/api/consumers/${id}`, payload, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  })
}

export const deleteOne = async (id) => {
  return await axios.delete(`${config.api_host}/api/consumers/${id}`)
}
