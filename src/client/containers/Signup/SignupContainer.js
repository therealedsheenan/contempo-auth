import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import io from 'socket.io-client'

const socket = io('http://localhost:3001')

// dependencies
import Signup from '../../components/Signup/SignupComponent'
import { requestSignup } from '../../redux/signup/actions'

const SignupContainer = React.createClass({
  propTypes: {
    requestSignup: PropTypes.func,
    success: PropTypes.bool
  },
  handleSubmit (values) {
    if (values.username && values.password && values.email) {
      this.props.requestSignup(values.username, values.password, values.email)
      socket.emit('signup', {
        username: values.username,
        password: values.password
      })
    }
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.success) {
      socket.emit('signup-success', {
        success: true
      })
    }
  },
  render () {
    return (
      <Signup
        success={this.props.success}
        onSubmit={this.handleSubmit} />
    )
  }
})

const mapStateToProps = ({ signupReducer }) => {
  return {
    success: signupReducer.success,
    processing: signupReducer.processing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestSignup: (username, password, email) => dispatch(requestSignup(username, password, email))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupContainer)
