import * as type from './types'
import api from '../../helpers/api'

import { Observable } from 'rxjs'

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
      .mergeMap(action => api.Users.getInfo()
        .then(response => {
          return getUsersSuccess(response)
        })
        .catch(getUsersError)
      )
  )
}
