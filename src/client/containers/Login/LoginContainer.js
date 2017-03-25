import React from 'react'
import LoginComponent from '../../components/Login/LoginComponent'

const Login = React.createClass({
  requestLogin (values) {

  },
  render () {
    return (
      <LoginComponent requestLogin={this.requestLogin}/>
    )
  }
})

export default Login
