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

export const usersEpic = action$ =>
  action$.ofType(type.GET_USERS)
    .mergeMap(action =>
       fetch(
          `${API_URL}/${'users/'}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': getToken()
            }
          }
        )
        .then((response) => {
          return response.json()
            .then(res => {
              return getUsersSuccess(res)
            })
            .catch(error => getUsersError(error))
        })
        .catch(getUsersError)
    )
