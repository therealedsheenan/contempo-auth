import React from 'react'
import LoginComponent from '../../components/Login/LoginComponent'
import AuthService from '../../helpers/AuthService'
import { Redirect } from 'react-router-dom'

const Login = React.createClass({
  getInitialState () {
    return {
      redirectToReferrer: false
    }
  },
  requestLogin () {
    return false
  },
  render () {
    console.log(this.props)
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <LoginComponent requestLogin={this.requestLogin} />
    )
  }
})

export default Login
