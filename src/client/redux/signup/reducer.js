import * as type from './types'

const initialState = {
  success: null,
  processing: true
}

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SIGNUP_USER_REQUEST:
      return {
        ...state,
        status: null,
        processing: true
      }

    case type.SIGNUP_USER_SUCCESS:
      return {
        success: true,
        processing: false
      }

    case type.SIGNUP_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        success: false,
        processing: false
      }

    default:
      return state
  }
}

export default signupReducer
