import axios from "axios"
import { BASE_URL } from "@/utils/constants"

export const getSession = (session) => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/api/v2/get_session`, {
      params: { session_id: session },
      headers: { Accept: 'application/json' },
    })
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
  })
}
