import type { Field } from './field'

export type Form = {
  id: string,
  title: string,
  fields: Field[],
  results: {
    ids: string[],
    list: any
  }
}

export const empty = {
  id: '#',
  title: '讀取中',
  fields: [],
  results: {
    ids: [],
    list: {}
  }
}
