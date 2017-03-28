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
    <LimitedAccessRoute path='/home' component={props => (
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

const PrivateRoute = (props, { component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      let { isAuthenticated, isAuthenticating } = props
      console.log(isAuthenticated)
      if (isAuthenticated) {
        return (
          React.createElement(component, props)
        )
      } else {
        console.log('no')
        return (
          <Redirect to={{
            pathname: '/',
            state: {from: props.location}
          }} />
        )
      }
    }} />
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticating: state.authReducer.isAuthenticating,
    isAuthenticated: state.authReducer.isAuthenticated,
    status: state.authReducer.status
  }
}

let LimitedAccessRoute = connect(mapStateToProps)(PrivateRoute))

export default routes
