import React from 'react'
import { Route } from 'react-router-dom'

// commons
import PrivateRoute from '../common/PrivateRoute'

// react containers
import Root from '../containers/Root/RootContainer'
import AsyncRoute from '../common/AsyncRoute'

const routes = () => (
  <Root>
    <PrivateRoute exact path='/home' component={props => (
      <AsyncRoute
        props={props}
        loadingPromise={
          System.import('../containers/Home/HomeContainer')
        } />
    )} />

    <Route strict exact path='/style' render={props => (
      <AsyncRoute
        props={props}
        loadingPromise={
          System.import('../containers/Styleguide/StyleguideContainer')
        } />
      )} />

    <Route strict exact path='/' render={props => (
      <AsyncRoute
        props={props}
        loadingPromise={
          System.import('../containers/Login/LoginContainer')
        } />
    )} />
  </Root>
)

export default routes
