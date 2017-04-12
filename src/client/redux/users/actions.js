import axios from 'axios'
import * as type from './types'
import { getToken } from '../authentication/utils'

import { Observable } from 'rxjs'
import { API_URL } from '../../helpers/constants'

export const requestUsers = () => {
  return {
    type: type.GET_USERS
  }
}

const getUsersError = () => Observable.of({
  type: type.GET_USERS_ERROR,
  error: 'Loading Error.'
})

const getUsersSuccess = (payload) => {
  return {
    type: type.GET_USERS_SUCCESS,
    users: payload
  }
}

export const usersEpic = action$ => {
  return (
    action$.ofType(type.GET_USERS)
      .mergeMap(action => {
        let url = `${API_URL}/${'users/'}`
        let props = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
          }
        }
        return axios(url, props)
          .then(response => {
            return getUsersSuccess(response)
          })
          .catch(getUsersError)
      })
  )
}
