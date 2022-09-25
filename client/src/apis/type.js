import axios from 'axios'
import { config } from '../config'

export const showDayType = async () => {
  return await axios.get(`${config.api_host}/api/dayType`)
}

export const showRoomType = async () => {
  return await axios.get(`${config.api_host}/api/roomType`)
}
