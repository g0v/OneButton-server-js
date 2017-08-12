export const TYPEFORM_LIST = 'TYPEFORM_LIST'
export const List = (list) => ({ type: TYPEFORM_LIST, list })

export const TYPEFORM_RESULT_LIST = 'TYPEFORM_RESULT_LIST'
export const ResultList = (uid, list) => ({ type: TYPEFORM_RESULT_LIST, uid, list })

export const TYPEFORM_RESULT = 'TYPEFORM_RESULT'
export const Result = (uid, token, result) => ({ type: TYPEFORM_RESULT, uid, token, result })
