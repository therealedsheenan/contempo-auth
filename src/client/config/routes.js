import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthService from '../helpers/AuthService'

// react containers
import Root from '../components/Root'
import AsyncRoute from '../components/AsyncRoute/AsyncRoute'

const routes = () => (
  <Root>
    <PrivateRoute path='/home' component={props => (
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

const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
    )
  )} />
)

export default routes
