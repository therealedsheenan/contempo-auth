import React from 'react'
import { Provider } from 'react-redux'
import { requestLoginSuccess, getToken } from './redux/modules/auth'

import routes from './config/routes'
import { store } from './config/store'

if (global) global.System = { import () {} }

// fetch token upon first render of store
if (getToken()) {
  store.dispatch(requestLoginSuccess(getToken))
}

const App = () => {
  return (
    <Provider store={store}>
      { routes() }
    </Provider>
  )
}

export default App
