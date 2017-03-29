import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const RedirectRoute = (newProps) => {
  return (
    <Route path={newProps.path} render={props => {
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
  return {
    authentication: {
      isAuthenticating: authReducer.isAuthenticating,
      isAuthenticated: authReducer.isAuthenticated,
      status: authReducer.status
    }
  }
}

export default connect(mapStateToProps)(RedirectRoute)
