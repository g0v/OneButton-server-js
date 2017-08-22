export type Answer = {
  field_id: number,
  type: string,
  value: any
}

export type Result = {
  version?: string,
  uid: string,
  token: string,
  tags: string[],
  answers: Answer[]
}

export const empty: Result = {
  uid: '',
  token: '',
  tags: [],
  answers: []
}
