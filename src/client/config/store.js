import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
// import thunk from 'redux-thunk'
import { routerReducer } from 'react-router-redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { reducer as formReducer } from 'redux-form'

// redux settings
import greetingReducer, { greetingEpic } from '../redux/modules/greeting'
import authReducer, { authEpic } from '../redux/modules/auth'

const combinedEpics = combineEpics(
  greetingEpic,
  authEpic
)

const epicMiddleWare = createEpicMiddleware(combinedEpics)

const reducers = {
  greetingReducer,
  authReducer,
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
