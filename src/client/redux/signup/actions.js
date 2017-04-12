import axios from 'axios'
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
        let url = `${API_URL}/${'user/signup'}`
        let props = {
          method: 'POST',
          data: {
            username: action.username,
            password: action.password,
            email: action.email,
            admin: false
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }

        return axios(url, props)
          .then(response => {
            if (response.data && response.data.token) {
              return requestSignupSuccess()
            }
            return requestSignupError('Credentials are wrong')
          })
          .catch(error => requestSignupError(error.message))
      })
  )
}
