import * as type from './types'
import { API_URL } from '../../helpers/constants'
import { removeToken } from './utils'
import axios from 'axios'

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
        let username = action.username
        let password = action.password
        let url = `${API_URL}/${'user/signin'}`
        let props = {
          method: 'POST',
          data: {
            username: username,
            password: password
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }
        return axios(url, props)
          .then(response => {
            if (response.data && response.data.token) {
              finishAuthentication(response.data.token)
              return requestLoginSuccess()
            }
            return requestLoginError('Credentials are wrong')
          })
          .catch(error => requestLoginError(error.message))
      })
  )
}
