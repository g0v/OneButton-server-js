import {
  TYPEFORM_LIST,
  TYPEFORM_RESULT_LIST,
  TYPEFORM_RESULT
} from '~/types/typeform'

export const initialState = {
  typeform: {
    list: [],
    results: {}
  },
  typeformResult: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case TYPEFORM_LIST: {
      const { list } = action

      return {
        ...state,
        typeform: {
          ...state.typeform,
          list
        }
      }
    }
    case TYPEFORM_RESULT_LIST: {
      const { uid, list } = action

      return {
        ...state,
        typeform: {
          ...state.typeform,
          results: {
            ...state.typeform.results,
            [uid]: list
          }
        }
      }
    }
    case TYPEFORM_RESULT: {
      const { uid, token, result } = action

      return {
        ...state,
        typeformResult: {
          ...state.typeformResult,
          [token]: result
        }
      }
    }

    default:
      return state
  }
}
