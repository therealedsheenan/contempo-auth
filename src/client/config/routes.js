import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthService from '../helpers/AuthService'

// react containers
import Root from '../components/Root'
import AsyncRoute from '../components/AsyncRoute/AsyncRoute'

const auth = new AuthService()

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

    <Route strict auth={auth} exact path='/' render={props => (
      <AsyncRoute
        props={props}
        loadingPromise={
          System.import('../containers/Login/LoginContainer')
        } />
    )} />
  </Root>
)

const PrivateRoute = ({ component, ...rest }) => {
  console.log(...rest)
  return (
    <Route {...rest} render={props => {
      if (auth.isAuthenticated()) {
        return (
          React.createElement(component, props)
        )
      } else {
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

export default routes
