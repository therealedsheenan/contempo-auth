import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoginComponent from '../../components/Login/LoginComponent'
import { requestLogin } from '../../redux/modules/auth'

const LoginContainer = React.createClass({
  propTypes: {
    requestLogin: React.PropTypes.func,
    location: React.PropTypes.object
  },
  getInitialState () {
    return {
      redirectToReferrer: false
    }
  },
  submit (values) {
    if (values.username && values.password) {
      this.props.requestLogin(values.username, values.password)
      this.setState({ redirectToReferrer: true })
    }
  },
  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <LoginComponent onSubmit={this.submit} />
    )
  }
})

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

const mapDispatchToProps = (dispatch) => {
  return {
    requestLogin: (username, password) => dispatch(requestLogin(username, password))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)

