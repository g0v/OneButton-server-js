/* @flow */

type FieldType
  = 'yes_no'
  | 'multiple_choice'
  | 'opinion_scale'
  | 'rating'
  | 'short_text'
  | 'long_text'

export type Field = {
  type: FieldType,
  id: number,
  question: string,
  description: string,
  required: boolean
}
