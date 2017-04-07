import * as type from './types'

const initialState = {
  users: [],
  fetching: true
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_USERS:
      return {
        ...state,
        fetching: true
      }
    case type.GET_USERS_ERROR:
      return {
        ...state,
        error: action.error,
        fetching: false
      }
    case type.GET_USERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: '',
        users: action.users
      }
    default:
      return state
  }
}

export default usersReducer
