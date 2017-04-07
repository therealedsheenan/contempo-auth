import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { socketConnect } from '../../helpers/socketConnect'

import LoginComponent from '../../components/Login/LoginComponent'
import { requestLogin } from '../../redux/authentication/actions'

const LoginContainer = React.createClass({
  propTypes: {
    requestLogin: PropTypes.func,
    location: PropTypes.object,
    authentication: PropTypes.object
  },
  submit (values) {
    if (values.username && values.password) {
      this.props.requestLogin(values.username, values.password)
      socketConnect.emit('login', {
        username: values.username,
        password: values.password
      })
    }
  },
  render () {
    if (this.props.authentication.isAuthenticated) {
      return (
        <Redirect to={'/home'} />
      )
    }

    return (
      <div>
        <LoginComponent
          onSubmit={this.submit}
          loginError={this.props.authentication.error} />
      </div>
    )
  }
})

const mapStateToProps = ({ authReducer }) => {
  return {
    authentication: {
      isAuthenticating: authReducer.isAuthenticating,
      isAuthenticated: authReducer.isAuthenticated,
      error: authReducer.error
    }
  }
}

export default connect(
  mapStateToProps,
  {requestLogin}
)(LoginContainer)

