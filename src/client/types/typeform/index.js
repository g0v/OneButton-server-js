export const TYPEFORM_FORM_LIST = 'TYPEFORM_FORM_LIST'
export const FormList = (ids) => ({ type: TYPEFORM_FORM_LIST, ids })

export const TYPEFORM_FORM = 'TYPEFORM_FORM'
export const Form = (uid, form) => ({ type: TYPEFORM_FORM, uid, form })

export const TYPEFORM_RESULT_LIST = 'TYPEFORM_RESULT_LIST'
export const ResultList = (uid, ids) => ({ type: TYPEFORM_RESULT_LIST, uid, ids })

export const TYPEFORM_RESULT = 'TYPEFORM_RESULT'
export const Result = (uid, token, result) => ({ type: TYPEFORM_RESULT, uid, token, result })
