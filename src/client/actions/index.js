import { Nop } from '~/types'
import axios from 'axios'

export const nop = store => async () => {
  const { dispatch } = store
  dispatch(Nop())
}
