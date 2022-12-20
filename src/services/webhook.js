import axios from "axios"
import { BASE_URL } from "@/utils/constants"
import { useStore } from '@/store';

export default () => {
  return new Promise((resolve, reject) => {
    const store = useStore();
    const { session, level } = store.state;

    console.log(session);

    const headers = {
      'Content-Type': 'application/json',
    }

    axios.post(`${BASE_URL}/trainer/webhook`, {
    // axios.post(`/api_webhook`, {
      session_id: session,
      score: 3,
      trainer_name: 'junior',
    }, {
      headers: headers,
    })
    .then((response) => {
      console.log(response);
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
  })
}
