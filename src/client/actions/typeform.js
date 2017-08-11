import { List, ResultList, Result } from '~/types/typeform'
import axios from 'axios'

export const list = store => async () => {
  const { dispatch } = store

  const result = await axios.get('/api/typeform').then(r => r.data)
  dispatch(List(result))

  return result
}

export const resultList = store => async (uid) => {
  const { dispatch } = store

  const result = await axios.get(`/api/typeform/${uid}`).then(r => r.data)
  dispatch(ResultList(uid, result))

  return result
}

export const result = store => async (uid, token) => {
  const { dispatch } = store

  const result = await axios.get(`/api/typeform/${uid}/result/${token}`).then(r => r.data)
  dispatch(Result(uid, token, result))

  return result
}
