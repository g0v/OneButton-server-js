import { Nop } from '~/types'
export * as typeform from './typeform'

export const nop = store => async () => {
  const { dispatch } = store
  dispatch(Nop())
}
