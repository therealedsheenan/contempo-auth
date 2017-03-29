import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// react containers
import Root from '../components/Root'
import AsyncRoute from '../components/AsyncRoute/AsyncRoute'

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

    <Route strict exact path='/' render={props => (
      <AsyncRoute
        props={props}
        loadingPromise={
          System.import('../containers/Login/LoginContainer')
        } />
    )} />
  </Root>
)

const PrivateRoute = (newProps) => {
  return (
    <Route path={newProps.path} render={props => {
      console.log(newProps.authentication)
      if (newProps.authentication.isAuthenticated) {
        return (
          React.createElement(newProps.component, props)
        )
      } else {
        return (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    }} />
  )
}

const mapStateToProps = ({authReducer}) => {
  console.log(authReducer)
  return {
    authentication: {
      isAuthenticating: authReducer.isAuthenticating,
      isAuthenticated: authReducer.isAuthenticated,
      status: authReducer.status
    }
  }
}

let LimitedAccessRoute = connect(mapStateToProps)(PrivateRoute)

export default routes
