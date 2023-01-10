import axios from "axios"
import { BASE_URL } from "@/utils/constants"

export const createSession = (id_lesson, id_trainer, type, grade, grades, not_from_russia, id_country, id_region, id_city) => {
  return new Promise((resolve, reject) => {
    axios.post(`${BASE_URL}/api/v1/save-questionary`, null, {
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM0MWUwZTJmNGRmZmZkOGNiMTVjOTg4YTcyYmQ5ZGZmOTViYWNmYTE4MzViY2VjNmJmMTkyZmM2NDMxMzBhYzRjMDZjNjg4MjI1MmIzNWJiIn0.eyJhdWQiOiIxIiwianRpIjoiYzQxZTBlMmY0ZGZmZmQ4Y2IxNWM5ODhhNzJiZDlkZmY5NWJhY2ZhMTgzNWJjZWM2YmYxOTJmYzY0MzEzMGFjNGMwNmM2ODgyMjUyYjM1YmIiLCJpYXQiOjE2NzMyNzY2NjEsIm5iZiI6MTY3MzI3NjY2MSwiZXhwIjoxNzA0ODEyNjYxLCJzdWIiOiI1Njg3NDYiLCJzY29wZXMiOltdfQ.WVPmIM6Q5amwxyiIGYUuicOFYM25OAJdz-3TgUzt-SADEARdlrIEj_gw0cNQbq9u7ZG15DJxfMCEhBJ2yrEp1_FThPrh2eajmxfgK6s74-Mc7OOUZ7ft4bH3q5SfQ3eGQ_37R-u1o9AMFFKMkDK1vU0_PU7N4A-feg2hI_H_vyrPgmPfzRWAQqFwwH4ZvoU5ykxH9n3Eg88LrrepOB5huP_nMEbqnnyoBWrF0WKQSM3eiGXyDPR0V9wQkPRbjIdXmSVNA7JoGFZOQYYjMi7SIyuf2vtq_hfw6xfNQPySZzv1Px7SMStnc1qll9ZLHARnru1gx82pA1b-60s00vAlF8rC-_Zyq3qUR5ZP3fRWCNi0UBiNL84GxN_qxhXrJRIO9KppqRlYDaqZYO9pArc-487yl_1EBbKosz0vnkajIv26kGxssadRWHoroLJV8R3FEIADzexvWafAxvP08p4ft1TLMfllX_zUxxbTR77aZpReK5_EMuJnf3MfIzBCs8R0Kcycy5mMwILwbOpTxBoCGAI0IM_KJ2tQE32MYYedu_KsVnih3zVUeP7N-DbgFUYScKf2vNJBoBrJ0FjTXA4xAzS69guVO4yBJMCx5BeRVKPtwk1hruyTKWgtKd65FAuUn85APm3a08BGuLeYKNKyZDpwdB9x4rsq4wnCfgEI6Kc',
      },
      params: {
        id_lesson,
        id_trainer,
        type,
        grade,
        pass_type: 'self',
        grades,
        not_from_russia,
        id_country,
        id_region,
        id_city,
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
