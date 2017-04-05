import * as type from './types'
import { API_URL } from '../../helpers/constants'

export const requestSignup = (username, password, email) => {
  return {
    type: type.SIGNUP_USER_REQUEST,
    username,
    password,
    email
  }
}

export const requestSignupSuccess = (payload) => {
  return {
    type: type.SIGNUP_USER_SUCCESS,
    payload
  }
}

const requestSignupError = (message) => {
  return {
    type: type.SIGNUP_USER_FAILURE,
    error: message
  }
}

export const signupEpic = (action$) => {
  return (
    action$.ofType(type.SIGNUP_USER_REQUEST)
      .mergeMap(action => {
        let username = action.username
        let password = action.password
        let email = action.email
        let admin = false // hardcoded admin status
        return fetch(
          `${API_URL}/${'user/signup'}`,
          {
            method: 'POST',
            body: JSON.stringify({username, password, email, admin}),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
          .then(response => {
            return response.json()
              .then(res => {
                if (!res.token) {
                  return requestSignupError('Credentials are wrong')
                }
                return requestSignupSuccess()
              })
              .catch((error) => {
                return requestSignupError(error)
              })
          })
          .catch(error => requestSignupError(error.message))
      })
  )
}
