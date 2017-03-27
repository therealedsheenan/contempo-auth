import { Observable } from 'rxjs'
import { login } from '../../helpers/Auth'
import { ajax } from 'rxjs/observable/dom/ajax'


const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
const LOGOUT_USER = 'LOGOUT_USER'

const initialState = {
  token: null,
  username: null,
  isAuthenticated: false,
  isAuthenticating: false,
  status: null
}

export const requestLogin = (username, password) => {
  return {
    type: LOGIN_USER_REQUEST,
    username,
    password
  }
}

export const requestLoginSuccess = (payload) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload
  }
}

const requestLoginError = (message) => {
  return {
    type: LOGIN_USER_FAILURE,
    error: message
  }
}

export const authEpic = (action$) => {
  return (
    action$.ofType(LOGIN_USER_REQUEST)
      .mergeMap(action => {
        login(action.username, action.password)
          .map(response => {
            console.log(response)
          })
        // Observable.from(login(action.username, action.password))
        //   .map((response) => {
        //     if (!response.token) {
        //       return (
        //         Observable.of({
        //           type: LOGIN_USER_FAILURE,
        //           error: response.message
        //         })
        //       )
        //     }
        //     return requestLoginSuccess(response)
        //   })
      })
  )
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        username: null,
        isAuthenticated: false,
        isAuthenticating: true,
        status: null
      }

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        username: action.username,
        isAuthenticated: true,
        isAuthenticating: false,
        status: 'success'
      }

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        username: null,
        isAuthenticated: false,
        isAuthenticating: false,
        error: action.error,
        status: 'failed'
      }

    case LOGOUT_USER:
      return {
        ...state,
        username: null,
        isAuthenticated: false,
        isAuthenticating: false,
        status: 'success'
      }

    default:
      return state
  }
}

export default authReducer
