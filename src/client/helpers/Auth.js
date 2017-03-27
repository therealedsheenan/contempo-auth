import { isTokenExpired } from './jwt'
import jwtDecode from 'jwt-decode'
import { ajax } from 'rxjs/observable/dom/ajax'

import { API_URL } from './constants'

const _doAuthentication = (endpoint, values) => {
  return doFetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' }
  })
}

// export const login = (user, password) => {
//   return _doAuthentication('users/authenticate', { user, password })
// }

export const login = (user, password) => {
  return ajax({
    method: 'POST',
    body: JSON.stringify({ user, password }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `${API_URL}/${'user/authenticate'}`
  })
}

const isAuthenticated = () => {
  // Checks if there is a saved token and it's still valid
  const token = localStorage.getItem('token')
  if (token) {
    return !isTokenExpired(token)
  } else {
    return false
  }
}

const getToken = () => {
  // Retrieves the user token from localStorage
  return localStorage.getItem('token')
}

const doFetch = (url, options) => {
  // performs api calls sending the required authentication headers
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (isAuthenticated()) {
    headers['Authorization'] = 'Bearer ' + getToken()
  }

  const settings = {
    url: url,
    headers: headers,
    method: options.method,
    body: options.body
  }

  return ajax(settings)
}


