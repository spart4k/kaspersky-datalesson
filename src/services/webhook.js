import axios from "axios"
import { BASE_URL } from "@/utils/constants"
import { useStore } from '@/store';

export default () => {
  return new Promise((resolve, reject) => {
    const store = useStore();
    const { session, level, progress } = store.state;

    const achievementArr = []
    const achievementHideArr = []
    const achievementNames = ['ya22_mt', 'ya22_in', 'ya22_an', 'ya22_ma', 'ya22_ml', 'ya22_pm']

    progress.forEach((el, i) => {
      if (el === 1) {
        achievementArr.push(`${achievementNames[i]}_silver`)
      }
      if (el === 2) {
        achievementArr.push(`${achievementNames[i]}_gold`)
        achievementHideArr.push(`${achievementNames[i]}_silver`)
      }
    })

    axios.post(`${BASE_URL}/trainer/webhook`, null, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        session_id: session,
        score: 3,
        trainer_name: level === '1' ? 'junior' : level === '2' ? 'middle' : 'senior',
        achievement: achievementArr,
        achievement_hide: achievementHideArr,
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
