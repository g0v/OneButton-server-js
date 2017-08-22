import {
  TYPEFORM_FORM_LIST,
  TYPEFORM_FORM,
  TYPEFORM_RESULT_LIST,
  TYPEFORM_RESULT
} from '~/types/typeform'

export const initialState = {
  forms: {
    ids: [],
    list: {}
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case TYPEFORM_FORM_LIST: {
      const { ids } = action

      return {
        ...state,
        forms: {
          ...state.forms,
          ids
        }
      }
    }
    case TYPEFORM_FORM: {
      const { uid, form } = action

      return {
        ...state,
        forms: {
          ...state.forms,
          list: {
            ...state.forms.list,
            [uid]: {
              ...form,
              results: {
                ids: [],
                list: {}
              }
            }
          }
        }
      }
    }

    case TYPEFORM_RESULT_LIST: {
      const { uid, ids } = action
      const form = state.forms.list[uid]

      return {
        ...state,
        forms: {
          ...state.forms,
          list: {
            ...state.forms.list,
            [uid]: {
              ...form,
              results: {
                ...form.results,
                ids
              }
            }
          }
        }
      }
    }
    case TYPEFORM_RESULT: {
      const { uid, token, result } = action
      const form = state.forms.list[uid]

      return {
        ...state,
        forms: {
          ...state.forms,
          list: {
            ...state.forms.list,
            [uid]: {
              ...form,
              results: {
                ...form.results,
                list: {
                  ...form.results.list,
                  [token]: result
                }
              }
            }
          }
        }
      }
    }

    default:
      return state
  }
}
