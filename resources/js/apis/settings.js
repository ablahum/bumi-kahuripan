import axios from 'axios'

export const getAll = async () => {
  return await axios.get('/settings')
}

export const updateAll = async (payload) => {
  return await axios.put(`/settings`, payload)
}
