import type { Field } from './field'

export type Form = {
  id: string,
  title: string,
  fields: Field[]
}

export const empty = {
  id: '#',
  title: '讀取中',
  fields: []
}
