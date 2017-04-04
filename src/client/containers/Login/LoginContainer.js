import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoginComponent from '../../components/Login/LoginComponent'
import { requestLogin } from '../../redux/authentication/actions'

const LoginContainer = React.createClass({
  propTypes: {
    requestLogin: PropTypes.func,
    location: PropTypes.object,
    authentication: PropTypes.object
  },
  componentDidMount () {
    if (this.props.authentication.isAuthenticated) {
      this.setState({ redirectToReferrer: true })
    }
  },
  submit (values) {
    if (values.username && values.password) {
      this.props.requestLogin(values.username, values.password)
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

