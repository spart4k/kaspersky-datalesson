import axios from "axios"
import { BASE_URL } from "@/utils/constants"
import { useStore } from '@/store';

export default () => {
  return new Promise((resolve, reject) => {
    const store = useStore();
    const { session } = store.state;

    axios.post(`${BASE_URL}/trainer/markFirstTask`, null, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        session_id: session,
        firstTask: 1,
      }
    })
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
  })
}
