import * as type from './types'

const initialState = {
  token: null,
  username: null,
  isAuthenticated: false,
  isAuthenticating: false,
  status: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LOGIN_USER_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: true,
        status: null
      }

    case type.LOGIN_USER_SUCCESS:
      return {
        isAuthenticated: true,
        isAuthenticating: false,
        status: 'success'
      }

    case type.LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        error: action.error,
        status: 'failed'
      }

    case type.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        status: 'success'
      }

    default:
      return state
  }
}

export default authReducer
