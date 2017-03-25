import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
// import thunk from 'redux-thunk'
import { routerReducer } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'
import { reducer as formReducer } from 'redux-form'

// redux settings
import greetingReducer, { greetingEpic } from '../redux/modules/greeting'

const epicMiddleWare = createEpicMiddleware(greetingEpic)

const reducers = {
  greetingReducer,
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
