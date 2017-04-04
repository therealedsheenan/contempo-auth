import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

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
      socket.emit('login', {
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
      <LoginComponent onSubmit={this.submit} />
    )
  }
})

const mapStateToProps = ({ authReducer }) => {
  return {
    authentication: {
      isAuthenticating: authReducer.isAuthenticating,
      isAuthenticated: authReducer.isAuthenticated
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestLogin: (username, password) => dispatch(requestLogin(username, password))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)

