import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoginComponent from '../../components/Login/LoginComponent'
import { requestLogin } from '../../redux/modules/auth'

const LoginContainer = React.createClass({
  propTypes: {
    requestLogin: PropTypes.func,
    location: PropTypes.object,
    authentication: PropTypes.object
  },
  getInitialState () {
    return {
      redirectToReferrer: false
    }
  },
  componentDidMount () {
    if (this.props.authentication.isAuthenticated) {
      this.setState({ redirectToReferrer: true })
    }
  },
  submit (values) {
    if (values.username && values.password) {
      this.props.requestLogin(values.username, values.password)
      this.setState({ redirectToReferrer: true })
    }
  },
  render () {
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={'/home'} />
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

