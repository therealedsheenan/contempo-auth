import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthService from '../helpers/AuthService'
import { connect } from 'react-redux'

// react containers
import Root from '../components/Root'
import AsyncRoute from '../components/AsyncRoute/AsyncRoute'

const auth = new AuthService()

const routes = () => (
  <Root>
    <LimitedAccessRoute exact path='/home' component={props => (
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

    <Route strict auth={auth} exact path='/' render={props => (
      <AsyncRoute
        props={props}
        loadingPromise={
          System.import('../containers/Login/LoginContainer')
        } />
    )} />
  </Root>
)

const PrivateRoute = (newProps) => {
  console.log(newProps.authentication)
  return (
    <Route exact path={newProps.path} render={props => {
      if (newProps.authentication.isAuthenticated) {
        return (
          React.createElement(newProps.component, props)
        )
      } else {
        return (
          <Redirect to={{
            pathname: '/',
            state: {from: props.location.pathname}
          }} />
        )
      }
    }} />
  )
}

const mapStateToProps = (state) => {
  const auth = state.authReducer
  return {
    authentication: {
      isAuthenticating: auth.isAuthenticating,
      isAuthenticated: auth.isAuthenticated,
      status: auth.status
    }
  }
}

let LimitedAccessRoute = connect(mapStateToProps)(PrivateRoute)

export default routes
