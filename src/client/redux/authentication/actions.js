import * as type from './types'
import { API_URL } from '../../helpers/constants'
import { removeToken } from './utils'

export const requestLogin = (username, password) => {
  return {
    type: type.LOGIN_USER_REQUEST,
    username,
    password
  }
}

export const requestLoginSuccess = (payload) => {
  return {
    type: type.LOGIN_USER_SUCCESS,
    payload
  }
}

const requestLoginError = (message) => {
  return {
    type: type.LOGIN_USER_FAILURE,
    error: message
  }
}

export const requestLogout = () => {
  // remove the token from the local storage first
  removeToken()
  return {
    type: type.LOGOUT_USER
  }
}

// set token on local storage
const finishAuthentication = (token) => {
  return localStorage.setItem('token', token)
}

export const authEpic = (action$) => {
  return (
    action$.ofType(type.LOGIN_USER_REQUEST)
      .mergeMap(action => {
        let user = action.username
        let password = action.password
        return fetch(
          `${API_URL}/${'users/authenticate'}`,
          {
            method: 'POST',
            body: JSON.stringify({user, password}),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        )
          .then(response => {
            return response.json()
              .then(res => {
                if (!res.token) {
                  return requestLoginError('Credentials are wrong')
                }
                finishAuthentication(res.token)
                return requestLoginSuccess()
              })
              .catch(error => requestLoginError(error))
          })
          .catch(error => requestLoginError(error.message))
      })
  )
}
