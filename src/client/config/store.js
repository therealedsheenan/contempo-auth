import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
// import thunk from 'redux-thunk'
import { routerReducer } from 'react-router-redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { reducer as formReducer } from 'redux-form'

// redux settings
import greetingReducer from '../redux/greeting/reducer'
import { greetingEpic } from '../redux/greeting/actions'

import authReducer from '../redux/authentication/reducer'
import { authEpic } from '../redux/authentication/actions'

import usersReducer from '../redux/users/reducer'
import { usersEpic } from '../redux/users/actions'

import signupReducer from '../redux/signup/reducer'
import { signupEpic } from '../redux/signup/actions'

const combinedEpics = combineEpics(
  greetingEpic,
  authEpic,
  usersEpic,
  signupEpic
)

const epicMiddleWare = createEpicMiddleware(combinedEpics)

const reducers = {
  greetingReducer,
  authReducer,
  usersReducer,
  signupReducer,
  routing: routerReducer,
  form: formReducer
}

export const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(epicMiddleWare),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
  )
)
