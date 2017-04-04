import React from 'react'
import Signup from '../../components/Signup/SignupComponent'

const SignupContainer = React.createClass({
  handleSubmit () {

  },
  render () {
    return (
      <Signup handleSubmit={this.handleSubmit} />
    )
  }
})

export default SignupContainer
