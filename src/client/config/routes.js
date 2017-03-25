import React from 'react'
import { Route } from 'react-router-dom'

// react containers
import Root from '../components/Root'
import AsyncRoute from '../components/AsyncRoute/AsyncRoute'

const routes = () => (
  <Root>
    <Route strict exact path='/' render={props => (
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

    <Route strict exact path='/login' render={props => (
      <AsyncRoute
        props={props}
        loadingPromise={
          System.import('../containers/Login/LoginContainer')
        } />
    )} />
  </Root>
)

export default routes
