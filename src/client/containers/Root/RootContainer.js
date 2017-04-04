import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'

import NavComponent from '../../components/Navigation/NavComponent'
import { getToken } from '../../redux/authentication/utils'
import { requestLoginSuccess, requestLogout } from '../../redux/authentication/actions'

const socket = io('http://localhost:3001')

// base css
import 'styles/base.scss'

const Root = React.createClass({
  propTypes: {
    children: PropTypes.array,
    getToken: PropTypes.func,
    requestLoginSuccess: PropTypes.func,
    requestLogout: PropTypes.func,
    authentication: PropTypes.object
  },
  componentDidMount () {
    // socket.on('server event', function (data) {
    //   console.log('test')
    //   console.log(data)
    //   socket.emit('client event', { message: '' })
    // })
    if (getToken()) {
      this.props.requestLoginSuccess(getToken())
    }
  },
  checkToken () {
    let token = this.props.getToken()
    return token ? this.props.requestLoginSuccess(token) : false
  },
  logout () {
    this.props.requestLogout()
  },
  render () {
    return (
      <main>
        <NavComponent authentication={this.props.authentication} logout={this.logout} />
        {this.props.children}
      </main>
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
    requestLoginSuccess: (token) => dispatch(requestLoginSuccess(token)),
    requestLogout: () => dispatch(requestLogout())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
